import requests

TIMEOUT = 5


def _get(url, params=None):
    try:
        r = requests.get(url, params=params, timeout=TIMEOUT)
        r.raise_for_status()
        return r.json()
    except Exception:
        return None


def get_country_facts(country_name):
    data = _get(f"https://restcountries.com/v3.1/name/{country_name}", params={"fullText": "true"})
    if not data:
        data = _get(f"https://restcountries.com/v3.1/name/{country_name}")
    if not data or not isinstance(data, list):
        return None

    c = data[0]
    capital = (c.get("capital") or ["N/A"])[0]
    population = c.get("population", 0)
    languages = ", ".join(c.get("languages", {}).values()) or "N/A"
    currencies = ", ".join(
        f"{v.get('name', k)} ({v.get('symbol', '')})"
        for k, v in c.get("currencies", {}).items()
    ) or "N/A"
    latlng = c.get("latlng") or [None, None]

    return {
        "capital": capital,
        "population": population,
        "languages": languages,
        "currencies": currencies,
        "lat": latlng[0],
        "lon": latlng[1],
    }


def get_weather(place_name):
    geo = _get(
        "https://geocoding-api.open-meteo.com/v1/search",
        params={"name": place_name, "count": 1, "language": "en"},
    )
    if not geo or not geo.get("results"):
        return None

    result = geo["results"][0]
    lat, lon = result["latitude"], result["longitude"]
    display_name = result.get("name", place_name)

    weather = _get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,weathercode,windspeed_10m",
            "timezone": "auto",
        },
    )
    if not weather or "current" not in weather:
        return None

    curr = weather["current"]
    return {
        "place": display_name,
        "temperature": curr.get("temperature_2m"),
        "windspeed": curr.get("windspeed_10m"),
        "weathercode": curr.get("weathercode", 0),
    }
