import random
from typing import List, Optional

import pandas as pd

from chatbot_api import get_country_facts, get_weather
from chatbot_data import df_cities, df_countries
from chatbot_utils import format_number, interpret


_WEATHER_CODES = {
    0: "clear sky", 1: "mainly clear", 2: "partly cloudy", 3: "overcast",
    45: "foggy", 48: "icy fog",
    51: "light drizzle", 53: "drizzle", 55: "heavy drizzle",
    61: "light rain", 63: "rain", 65: "heavy rain",
    71: "light snow", 73: "snow", 75: "heavy snow",
    80: "rain showers", 81: "showers", 82: "heavy showers",
    95: "thunderstorm", 96: "thunderstorm with hail",
}

_MEDALS = ["🥇", "🥈", "🥉", "4.", "5."]


COUNTRY_METRICS = {
    "safety": {
        "label": "safety",
        "column": "Safety Index",
        "higher_is_better": True,
        "keywords": ["safe", "safety", "crime"],
    },
    "cost": {
        "label": "cost of living",
        "column": "Cost of Living Index",
        "higher_is_better": False,
        "keywords": ["cost", "expensive", "cheap", "affordable", "budget", "rent"],
    },
    "healthcare": {
        "label": "healthcare",
        "column": "Health Care Index",
        "higher_is_better": True,
        "keywords": ["health", "healthcare", "health care", "hospital", "medical"],
    },
    "pollution": {
        "label": "clean environment",
        "column": "Pollution Index",
        "higher_is_better": False,
        "keywords": ["clean", "pollution", "polluted", "air", "environment"],
    },
    "quality": {
        "label": "quality of life",
        "column": "Quality of Life Index",
        "higher_is_better": True,
        "keywords": ["quality", "quality of life", "life", "live", "living"],
    },
}


CITY_TOPICS = {
    "culture": {
        "label": "culture",
        "column": "culture",
        "keywords": ["culture", "art", "history", "museum"],
    },
    "adventure": {
        "label": "adventure",
        "column": "adventure",
        "keywords": ["adventure", "hiking", "trekking", "mountain", "explore"],
    },
    "nature": {
        "label": "nature",
        "column": "nature",
        "keywords": ["nature", "green", "forest", "lake", "wildlife"],
    },
    "beach": {
        "label": "beaches",
        "column": "beaches",
        "keywords": ["beach", "beaches", "sea", "coast", "island"],
    },
    "nightlife": {
        "label": "nightlife",
        "column": "nightlife",
        "keywords": ["nightlife", "party", "club", "bar"],
    },
    "food": {
        "label": "food",
        "column": "cuisine",
        "keywords": ["food", "cuisine", "restaurant", "eat", "gastronomy"],
    },
    "wellness": {
        "label": "wellness",
        "column": "wellness",
        "keywords": ["wellness", "spa", "relax", "calm"],
    },
    "urban": {
        "label": "urban life",
        "column": "urban",
        "keywords": ["urban", "modern"],
    },
    "quiet": {
        "label": "quiet trips",
        "column": "seclusion",
        "keywords": ["quiet", "seclusion", "remote", "peaceful"],
    },
}


def _country_row(country: str):
    rows = df_countries[df_countries["country_lower"] == country]
    return None if rows.empty else rows.iloc[0]


def _city_row(city: str):
    rows = df_cities[df_cities["city_lower"] == city]
    return None if rows.empty else rows.iloc[0]


def _top_rows(df: pd.DataFrame, column: str, higher_is_better: bool, limit: int) -> pd.DataFrame:
    ranked = df.copy()
    ranked[column] = pd.to_numeric(ranked[column], errors="coerce").fillna(0.0)
    return ranked.nlargest(limit, column) if higher_is_better else ranked.nsmallest(limit, column)


def _city_scores(row) -> List[tuple[str, float]]:
    scores = []
    for topic in CITY_TOPICS.values():
        value = pd.to_numeric(pd.Series([row.get(topic["column"])]), errors="coerce").iloc[0]
        if pd.notna(value):
            scores.append((topic["label"], float(value)))
    return scores


def show_country_summary(country: str) -> str:
    row = _country_row(country)
    if row is None:
        return f"Sorry, I do not have data for {country.title()}."

    n    = row["Country"]
    qol  = interpret(row["Quality of Life Index"], "quality")
    safe = interpret(row["Safety Index"], "safety")
    hlth = interpret(row["Health Care Index"], "healthcare")
    cost = interpret(row["Cost of Living Index"], "cost")

    return random.choice([
        f"{n} offers {qol} quality of life. It is {safe}, with {hlth} and a cost of living that is {cost}.",
        f"{n} is a country with {qol} quality of life, considered {safe} and offering {hlth}. The cost of living is {cost}.",
        f"{n} has {qol} quality of life, is {safe}, offers {hlth}, and has a {cost} cost of living.",
    ])


def show_country_metric(country: str, metric_key: str) -> str:
    if metric_key == "quality":
        return show_country_summary(country)

    row = _country_row(country)
    if row is None:
        return f"Sorry, I do not have data for {country.title()}."

    n = row["Country"]

    if metric_key == "safety":
        safe  = interpret(row["Safety Index"], "safety")
        crime = interpret(row["Crime Index"], "crime")
        return random.choice([
            f"{n} is generally {safe}, with {crime} reported across the country.",
            f"{n} is considered {safe}. Crime levels are {crime}.",
            f"{n} has {crime} — it is {safe} overall.",
        ])

    if metric_key == "cost":
        cost = interpret(row["Cost of Living Index"], "cost")
        rent = interpret(row["Rent Index"], "cost")
        groc = interpret(row["Groceries Index"], "cost")
        return random.choice([
            f"{n} is {cost} overall. Rent tends to be {rent}, and groceries are {groc}.",
            f"{n} has a {cost} cost of living, with {rent} rent prices and {groc} at the supermarket.",
            f"{n} is {cost} to live in — rent is {rent} and food shopping is {groc}.",
        ])

    if metric_key == "healthcare":
        hlth = interpret(row["Health Care Index"], "healthcare")
        return random.choice([
            f"{n} has {hlth}, so you can expect solid medical support if needed.",
            f"{n} offers {hlth}, which is good to know before travelling.",
            f"{n} is known for having {hlth} available across the country.",
        ])

    # pollution
    poll = interpret(row["Pollution Index"], "pollution")
    fresh = "great for those who enjoy fresh air" if "clean" in poll else "worth considering if you are sensitive to pollution"
    return random.choice([
        f"{n} has {poll} — {fresh}.",
        f"{n} is known for {poll}, which makes it {fresh}.",
        f"{n}'s air quality is {poll}, making it {fresh}.",
    ])


def show_best_countries(metric_key: str) -> str:
    metric  = COUNTRY_METRICS[metric_key]
    ranked  = _top_rows(df_countries, metric["column"], metric["higher_is_better"], 5)
    entries = [
        f"{_MEDALS[i]} {row['Country']} — {format_number(row[metric['column']])}"
        for i, (_, row) in enumerate(ranked.iterrows())
    ]
    body = "\n".join(entries)

    return random.choice([
        f"🏆 Top 5 countries for {metric['label']}:\n{body}",
        f"Here are the best countries for {metric['label']}:\n{body}",
        f"Ranking by {metric['label']}:\n{body}",
    ])


def show_city_info(city: str) -> str:
    row = _city_row(city)
    if row is None:
        return f"Sorry, I do not have data for {city.title()}."

    top_scores = _city_scores(row)
    top_scores.sort(key=lambda item: item[1], reverse=True)
    best_for = ", ".join(
        f"{label} ({interpret(score, 'city')})"
        for label, score in top_scores[:3]
    )
    description = str(row.get("short_description", "")).strip()
    desc_line   = f"\n{description}" if description and description.lower() != "nan" else ""

    name    = row["city"]
    country = row["country"]
    region  = row.get("region", "N/A")
    budget  = row.get("budget_level", "N/A")

    return random.choice([
        f"{name} is a city in {country}, located in the {region} region. Budget: {budget}. Best for: {best_for}.{desc_line}",
        f"Located in {country} ({region}), {name} is a {budget.lower()} destination. Best for: {best_for}.{desc_line}",
        f"{name}, {country} — a {budget.lower()} city in the {region} area. Best for: {best_for}.{desc_line}",
    ])


def show_best_cities(topic_key: str) -> str:
    topic   = CITY_TOPICS[topic_key]
    ranked  = _top_rows(df_cities, topic["column"], True, 5)
    entries = [
        f"{_MEDALS[i]} {row['city']}, {row['country']} ({format_number(row[topic['column']])} / 5)"
        for i, (_, row) in enumerate(ranked.iterrows())
    ]
    body = "\n".join(entries)

    return random.choice([
        f"🏆 Top 5 cities for {topic['label']}:\n{body}",
        f"Best cities for {topic['label']}:\n{body}",
        f"Looking for {topic['label']}? Here are the top picks:\n{body}",
    ])


def compare_countries(countries: List[str], metric_key: str) -> str:
    metric = COUNTRY_METRICS[metric_key]
    scale  = metric_key if metric_key in ("safety", "cost", "healthcare", "pollution", "quality") else "quality"
    scored = []

    for country in countries[:2]:
        row = _country_row(country)
        if row is None:
            return f"Sorry, I do not have data for {country.title()}."
        value = pd.to_numeric(pd.Series([row[metric["column"]]]), errors="coerce").iloc[0]
        scored.append((row["Country"], float(value)))

    scored.sort(key=lambda item: item[1], reverse=metric["higher_is_better"])
    a_name, a_val = scored[0]
    b_name, b_val = scored[1]
    a_desc = interpret(a_val, scale)
    b_desc = interpret(b_val, scale)
    is_tie = abs(a_val - b_val) < 1e-9
    result = "It's a tie!" if is_tie else f"Winner: {a_name} ✅"

    return random.choice([
        f"Comparing {metric['label']}: {a_name} is {a_desc}, while {b_name} is {b_desc}. {result}",
        f"In terms of {metric['label']}, {a_name} comes across as {a_desc} and {b_name} as {b_desc}. {result}",
        f"{a_name} ({a_desc}) versus {b_name} ({b_desc}) on {metric['label']}. {result}",
    ])


def compare_cities(cities: List[str], topic_key: Optional[str] = None) -> str:
    rows = []
    for city in cities[:2]:
        row = _city_row(city)
        if row is None:
            return f"Sorry, I do not have data for {city.title()}."
        rows.append(row)

    if topic_key:
        label  = CITY_TOPICS[topic_key]["label"]
        column = CITY_TOPICS[topic_key]["column"]
        scored = [(f"{row['city']}, {row['country']}", float(row[column])) for row in rows]
    else:
        label  = "overall"
        scored = []
        for row in rows:
            values = [score for _, score in _city_scores(row)]
            scored.append((f"{row['city']}, {row['country']}", sum(values) / len(values)))

    scored.sort(key=lambda item: item[1], reverse=True)
    a_name, a_val = scored[0]
    b_name, b_val = scored[1]
    a_desc = interpret(a_val, "city")
    b_desc = interpret(b_val, "city")
    is_tie = abs(a_val - b_val) < 1e-9
    result = "It's a tie!" if is_tie else f"Best pick: {a_name} ✅"

    return random.choice([
        f"Comparing {label}: {a_name} scores {a_desc} and {b_name} scores {b_desc}. {result}",
        f"For {label}, {a_name} is {a_desc} while {b_name} is {b_desc}. {result}",
        f"On {label}, {a_name} comes out as {a_desc} compared to {b_name} which is {b_desc}. {result}",
    ])


def recommend_cities(topic_keys: List[str], budget_level: Optional[str] = None) -> str:
    cities = df_cities.copy()

    if budget_level:
        filtered = cities[cities["budget_level"].astype(str).str.lower() == budget_level.lower()]
        if not filtered.empty:
            cities = filtered

    score_columns = [CITY_TOPICS[key]["column"] for key in topic_keys if key in CITY_TOPICS]
    if not score_columns:
        score_columns = ["culture"]

    cities = cities.copy()
    numeric_scores = cities[score_columns].apply(pd.to_numeric, errors="coerce").fillna(0.0)
    cities["score"] = numeric_scores.mean(axis=1)
    ranked = cities.nlargest(3, "score")

    labels = [CITY_TOPICS[key]["label"] for key in topic_keys if key in CITY_TOPICS]
    if budget_level:
        labels.append(budget_level.lower())
    tag = ", ".join(labels) if labels else "travel"

    entries = [
        f"{_MEDALS[i]} {row['city']}, {row['country']} — {row.get('budget_level', 'N/A')} ({format_number(row['score'])}/5)"
        for i, (_, row) in enumerate(ranked.iterrows())
    ]
    body = "\n".join(entries)

    return random.choice([
        f"✈️ Top picks for {tag}:\n{body}",
        f"For {tag}, I'd suggest:\n{body}",
        f"Great destinations for {tag}:\n{body}",
    ])


def city_metric_not_available(city: str, metric_key: str) -> str:
    row = _city_row(city)
    metric_label = COUNTRY_METRICS[metric_key]["label"]
    if row is None:
        return f"I only track {metric_label} at country level."
    return f"I only track {metric_label} at country level. Try asking about {row['country']}."


def show_city_country_metric(city: str, metric_key: str) -> str:
    row = _city_row(city)
    if row is None:
        return city_metric_not_available(city, metric_key)
    country = str(row["country"]).lower().strip()
    country_data = show_country_metric(country, metric_key)

    return random.choice([
        f"{row['city']} is in {row['country']}. {country_data}",
        f"I track that at country level, so here's the data for {row['country']}: {country_data}",
        f"{row['city']} belongs to {row['country']}, so here's what I know: {country_data}",
    ])


def show_country_facts(country: str) -> str:
    facts = get_country_facts(country)
    if not facts:
        return f"Sorry, I could not find information for {country.title()}."

    n    = country.title()
    cap  = facts["capital"]
    pop  = f"{facts['population']:,}"
    lang = facts["languages"]
    curr = facts["currencies"]

    return random.choice([
        f"{n} has its capital in {cap} and a population of {pop}. People speak {lang} there, and the currency is {curr}.",
        f"{n}'s capital is {cap}, with a population of {pop}. The official language(s) are {lang} and the currency is {curr}.",
        f"{n} — capital: {cap}, population: {pop}, language(s): {lang}, currency: {curr}.",
    ])


def show_weather(place: str) -> str:
    data = get_weather(place)
    if not data:
        return f"Sorry, I could not get weather data for {place.title()}."

    condition = _WEATHER_CODES.get(data["weathercode"], "unknown conditions")
    name  = data["place"]
    temp  = data["temperature"]
    wind  = data["windspeed"]

    return random.choice([
        f"{name} is currently {temp}°C with {condition} and winds of {wind} km/h.",
        f"{name} has {condition} right now, with a temperature of {temp}°C and winds at {wind} km/h.",
        f"{name}: {temp}°C, {condition}, wind {wind} km/h.",
    ])
