import nltk
from nltk.stem import WordNetLemmatizer

from chatbot_data import CITY_NAMES, COUNTRY_NAMES
from chatbot_responses import (
    CITY_TOPICS,
    COUNTRY_METRICS,
    city_metric_not_available,
    compare_cities,
    compare_countries,
    recommend_cities,
    show_best_cities,
    show_best_countries,
    show_city_info,
    show_country_metric,
    show_country_summary,
)
from chatbot_utils import find_mentions, has_keyword, normalize_text


nltk.download("punkt", quiet=True)
nltk.download("averaged_perceptron_tagger_eng", quiet=True)
nltk.download("wordnet", quiet=True)

lemmatizer = WordNetLemmatizer()

HELP_TEXT = (
    "I can answer simple travel questions.\n"
    "Try something like:\n"
    "- Is Japan safe?\n"
    "- How expensive is Switzerland?\n"
    "- Tell me about Paris\n"
    "- Best city for food\n"
    "- Best country to live in\n"
    "- Russia vs China health care\n"
    "- Where should I go for food and culture?"
)

COMPARISON_WORDS = ["vs", "versus", "compare", "than", "or"]
RECOMMEND_WORDS = ["recommend", "suggest", "want", "prefer", "like"]
CITY_WORDS = {"city", "destination", "place", "trip"}
COUNTRY_WORDS = {"country", "countries"}
COUNTRY_LEVEL_METRICS = {"safety", "cost", "healthcare", "pollution"}


def _pick_country_metric(text: str, tokens: list[str]) -> str:
    for metric_key, config in COUNTRY_METRICS.items():
        if has_keyword(text, tokens, config["keywords"]):
            return metric_key
    return "quality"


def _pick_city_topics(text: str, tokens: list[str]) -> list[str]:
    topics = []
    for topic_key, config in CITY_TOPICS.items():
        if has_keyword(text, tokens, config["keywords"]):
            topics.append(topic_key)
    return topics


def _pick_budget_level(text: str, tokens: list[str]):
    if has_keyword(text, tokens, ["budget", "cheap", "affordable"]):
        return "Budget"
    if has_keyword(text, tokens, ["luxury", "premium", "exclusive"]):
        return "Luxury"
    return None


def _is_recommendation(
    text: str,
    tokens: list[str],
    verbs_lemm: list[str],
    wh_words: list[str],
    countries: list[str],
    cities: list[str],
) -> bool:
    if countries or cities:
        return False

    return (
        has_keyword(text, tokens, RECOMMEND_WORDS)
        or ("where" in wh_words and "go" in verbs_lemm)
    )


def apply_rules(
    text: str,
    tokens: list[str],
    nouns: list[str],
    verbs_lemm: list[str],
    wh_words: list[str],
) -> str:
    countries = find_mentions(text, COUNTRY_NAMES)
    cities = find_mentions(text, CITY_NAMES)
    metric_key = _pick_country_metric(text, tokens)
    topics = _pick_city_topics(text, tokens)
    budget_level = _pick_budget_level(text, tokens)

    if len(countries) >= 2 and has_keyword(text, tokens, COMPARISON_WORDS):
        return compare_countries(countries, metric_key)

    if len(cities) >= 2 and has_keyword(text, tokens, COMPARISON_WORDS):
        if metric_key in COUNTRY_LEVEL_METRICS and has_keyword(text, tokens, COUNTRY_METRICS[metric_key]["keywords"]):
            return f"I only compare {COUNTRY_METRICS[metric_key]['label']} at country level."
        return compare_cities(cities, topics[0] if topics else None)

    if _is_recommendation(text, tokens, verbs_lemm, wh_words, countries, cities):
        if topics or budget_level:
            return recommend_cities(topics, budget_level)
        return HELP_TEXT

    if countries:
        if metric_key == "quality":
            return show_country_summary(countries[0])
        return show_country_metric(countries[0], metric_key)

    if cities:
        if metric_key in COUNTRY_LEVEL_METRICS and has_keyword(text, tokens, COUNTRY_METRICS[metric_key]["keywords"]):
            return city_metric_not_available(cities[0], metric_key)
        return show_city_info(cities[0])

    asks_best = has_keyword(text, tokens, ["best", "top", "rank", "ranking"])
    asks_city = bool(CITY_WORDS.intersection(nouns)) or bool(topics)
    asks_country = bool(COUNTRY_WORDS.intersection(nouns)) or "live" in tokens

    if asks_best or "which" in wh_words:
        if asks_city and not asks_country:
            return show_best_cities(topics[0] if topics else "culture")
        return show_best_countries(metric_key)

    return HELP_TEXT


def chatbot_response(sentence: str) -> str:
    text = normalize_text(sentence)
    words = nltk.word_tokenize(text)
    tags = nltk.pos_tag(words)

    nouns = [lemmatizer.lemmatize(word, pos="n") for word, tag in tags if tag.startswith("N")]
    verbs = [word for word, tag in tags if tag.startswith("V")]
    verbs_lemm = [lemmatizer.lemmatize(word, pos="v") for word in verbs]
    wh_words = [word for word, tag in tags if tag.startswith("W")]
    tokens = [word for word in words if word.isalpha()]

    return apply_rules(text, tokens, nouns, verbs_lemm, wh_words)
