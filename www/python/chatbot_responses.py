from typing import List, Optional

import pandas as pd

from chatbot_data import df_cities, df_countries
from chatbot_utils import format_number


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

    return "\n".join(
        [
            f"{row['Country']} - quality of life",
            f"Quality of life index: {format_number(row['Quality of Life Index'])}",
            f"Safety index: {format_number(row['Safety Index'])}",
            f"Health care index: {format_number(row['Health Care Index'])}",
            f"Cost of living index: {format_number(row['Cost of Living Index'])}",
        ]
    )


def show_country_metric(country: str, metric_key: str) -> str:
    if metric_key == "quality":
        return show_country_summary(country)

    row = _country_row(country)
    if row is None:
        return f"Sorry, I do not have data for {country.title()}."

    if metric_key == "safety":
        return "\n".join(
            [
                f"{row['Country']} - safety",
                f"Safety index: {format_number(row['Safety Index'])}",
                f"Crime index: {format_number(row['Crime Index'])}",
            ]
        )

    if metric_key == "cost":
        return "\n".join(
            [
                f"{row['Country']} - cost of living",
                f"Cost of living index: {format_number(row['Cost of Living Index'])}",
                f"Rent index: {format_number(row['Rent Index'])}",
                f"Groceries index: {format_number(row['Groceries Index'])}",
            ]
        )

    if metric_key == "healthcare":
        return "\n".join(
            [
                f"{row['Country']} - healthcare",
                f"Health care index: {format_number(row['Health Care Index'])}",
                f"Health care exp. index: {format_number(row['Health Care Exp. Index'])}",
            ]
        )

    return "\n".join(
        [
            f"{row['Country']} - environment",
            f"Pollution index: {format_number(row['Pollution Index'])}",
            "Lower values mean cleaner air.",
        ]
    )


def show_best_countries(metric_key: str) -> str:
    metric = COUNTRY_METRICS[metric_key]
    ranked = _top_rows(df_countries, metric["column"], metric["higher_is_better"], 5)
    lines = [f"Top 5 countries for {metric['label']}:"]

    for i, (_, row) in enumerate(ranked.iterrows(), start=1):
        lines.append(f"{i}. {row['Country']} ({format_number(row[metric['column']])})")

    return "\n".join(lines)


def show_city_info(city: str) -> str:
    row = _city_row(city)
    if row is None:
        return f"Sorry, I do not have data for {city.title()}."

    top_scores = _city_scores(row)
    top_scores.sort(key=lambda item: item[1], reverse=True)
    best_for = ", ".join(f"{label} ({format_number(score)}/5)" for label, score in top_scores[:3])
    description = str(row.get("short_description", "")).strip()

    lines = [
        f"{row['city']}, {row['country']}",
        f"Region: {row.get('region', 'N/A')}",
        f"Budget: {row.get('budget_level', 'N/A')}",
    ]
    if best_for:
        lines.append(f"Best for: {best_for}")
    if description and description.lower() != "nan":
        lines.append(description)

    return "\n".join(lines)


def show_best_cities(topic_key: str) -> str:
    topic = CITY_TOPICS[topic_key]
    ranked = _top_rows(df_cities, topic["column"], True, 5)
    lines = [f"Top 5 cities for {topic['label']}:"]

    for i, (_, row) in enumerate(ranked.iterrows(), start=1):
        lines.append(f"{i}. {row['city']}, {row['country']} ({format_number(row[topic['column']])}/5)")

    return "\n".join(lines)


def compare_countries(countries: List[str], metric_key: str) -> str:
    metric = COUNTRY_METRICS[metric_key]
    scored = []

    for country in countries[:2]:
        row = _country_row(country)
        if row is None:
            return f"Sorry, I do not have data for {country.title()}."
        value = pd.to_numeric(pd.Series([row[metric["column"]]]), errors="coerce").iloc[0]
        scored.append((row["Country"], float(value)))

    scored.sort(key=lambda item: item[1], reverse=metric["higher_is_better"])
    lines = [f"Comparison by {metric['label']}:"]

    for country_name, value in scored:
        lines.append(f"- {country_name}: {format_number(value)}")

    winners = [name for name, value in scored if abs(value - scored[0][1]) < 1e-9]
    if len(winners) > 1:
        lines.append(f"Result: tie between {', '.join(winners)}")
    else:
        lines.append(f"Best option: {scored[0][0]}")
    return "\n".join(lines)


def compare_cities(cities: List[str], topic_key: Optional[str] = None) -> str:
    rows = []
    for city in cities[:2]:
        row = _city_row(city)
        if row is None:
            return f"Sorry, I do not have data for {city.title()}."
        rows.append(row)

    if topic_key:
        label = CITY_TOPICS[topic_key]["label"]
        column = CITY_TOPICS[topic_key]["column"]
        scored = [(f"{row['city']}, {row['country']}", float(row[column])) for row in rows]
    else:
        label = "overall city score"
        scored = []
        for row in rows:
            values = [score for _, score in _city_scores(row)]
            scored.append((f"{row['city']}, {row['country']}", sum(values) / len(values)))

    scored.sort(key=lambda item: item[1], reverse=True)
    lines = [f"Comparison by {label}:"]
    for city_name, value in scored:
        lines.append(f"- {city_name}: {format_number(value)}/5")
    winners = [name for name, value in scored if abs(value - scored[0][1]) < 1e-9]
    if len(winners) > 1:
        lines.append(f"Result: tie between {', '.join(winners)}")
    else:
        lines.append(f"Best option: {scored[0][0]}")
    return "\n".join(lines)


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
    request_label = ", ".join(labels) if labels else "travel"

    lines = [f"Suggested destinations for {request_label}:"]
    for i, (_, row) in enumerate(ranked.iterrows(), start=1):
        lines.append(
            f"{i}. {row['city']}, {row['country']} - {row.get('budget_level', 'N/A')} - {format_number(row['score'])}/5"
        )

    return "\n".join(lines)


def city_metric_not_available(city: str, metric_key: str) -> str:
    row = _city_row(city)
    metric_label = COUNTRY_METRICS[metric_key]["label"]

    if row is None:
        return f"I only use {metric_label} at country level."

    return f"I only use {metric_label} at country level. Try asking about {row['country']}."
