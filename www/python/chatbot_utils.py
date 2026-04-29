import re
from typing import Iterable, List


def normalize_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s'-]", " ", text)
    return re.sub(r"\s+", " ", text)


def contains_phrase(text: str, phrase: str) -> bool:
    pattern = rf"(?<!\w){re.escape(phrase)}(?!\w)"
    return re.search(pattern, text) is not None


def find_mentions(text: str, candidates: Iterable[str]) -> List[str]:
    return [candidate for candidate in candidates if contains_phrase(text, candidate)]


def has_keyword(text: str, tokens: List[str], keywords: Iterable[str]) -> bool:
    for keyword in keywords:
        if " " in keyword:
            if contains_phrase(text, keyword):
                return True
        elif keyword in tokens:
            return True
    return False


def format_number(value) -> str:
    try:
        return f"{float(value):.1f}"
    except (TypeError, ValueError):
        return "N/A"
