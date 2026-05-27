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


# Thresholds: sorted highest→lowest; first match wins.
_SCALES = {
    "safety":     [(80,"extremely safe"),(65,"very safe"),(50,"fairly safe"),(35,"some safety concerns"),(0,"high crime rates")],
    "crime":      [(75,"very high crime"),(60,"high crime"),(45,"moderate crime"),(30,"low crime"),(0,"very low crime")],
    "cost":       [(80,"very expensive"),(65,"expensive"),(45,"moderate cost"),(25,"affordable"),(0,"very affordable")],
    "healthcare": [(80,"world-class healthcare"),(65,"excellent healthcare"),(50,"good healthcare"),(35,"adequate healthcare"),(0,"limited healthcare")],
    "pollution":  [(90,"heavily polluted"),(70,"quite polluted"),(50,"moderate pollution"),(30,"fairly clean"),(0,"very clean air")],
    "quality":    [(160,"outstanding"),(130,"excellent"),(100,"good"),(70,"average"),(0,"below average")],
    "city":       [(4.5,"outstanding"),(3.5,"great"),(2.5,"good"),(1.5,"decent"),(0,"below average")],
}


def interpret(value, scale: str) -> str:
    try:
        v = float(value)
    except (TypeError, ValueError):
        return "N/A"
    for threshold, label in _SCALES[scale]:
        if v >= threshold:
            return label
    return _SCALES[scale][-1][1]
