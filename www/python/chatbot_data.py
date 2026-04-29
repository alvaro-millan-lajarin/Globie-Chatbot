from pathlib import Path

import pandas as pd


BASE_DIR  = Path(__file__).resolve().parent
ASSET_DIR = BASE_DIR / "assets"          # fixed: was "asset" (typo in original)


def _read_csv(filename: str) -> pd.DataFrame:
    return pd.read_csv(ASSET_DIR / filename)


def _load_countries() -> pd.DataFrame:
    countries = _read_csv("Quality of life index by countries 2020.csv").copy()
    cost   = _read_csv("Cost of living index by country 2020.csv")[["Country", "Rent Index", "Groceries Index"]]
    crime  = _read_csv("Crime index by countries 2020.csv")[["Country", "Crime Index"]]
    health = _read_csv("Health care index by countries 2020.csv")[["Country", "Health Care Exp. Index"]]

    countries = countries.merge(cost,   on="Country", how="left")
    countries = countries.merge(crime,  on="Country", how="left")
    countries = countries.merge(health, on="Country", how="left")
    countries["country_lower"] = countries["Country"].astype(str).str.lower().str.strip()
    return countries


def _load_cities() -> pd.DataFrame:
    cities = _read_csv("Worldwide Travel Cities Dataset (Ratings and Climate).csv").copy()
    cities["city_lower"] = cities["city"].astype(str).str.lower().str.strip()
    return cities


df_countries = _load_countries()
df_cities    = _load_cities()

COUNTRY_NAMES = sorted(df_countries["country_lower"].dropna().unique(), key=len, reverse=True)
CITY_NAMES    = sorted(df_cities["city_lower"].dropna().unique(),    key=len, reverse=True)
