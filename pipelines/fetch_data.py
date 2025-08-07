# import pandas as pd

# def fetch_external_data():
#     # Placeholder: load from World Bank or UNICEF
#     # return pd.read_csv("data/external/socioeconomic.csv")
#     return pd.read_csv("data/external/mhm.csv")

# def fetch_internal_data():
#     return pd.read_csv("data/internal/distribution_simulated.csv")

# def merge_data(ext_df, int_df):
#     return pd.merge(ext_df, int_df, on="country", how="inner")

import pandas as pd
import os

def fetch_external_data():
    path = os.path.join("data", "external", "mhm.csv")
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found.")
    return pd.read_csv(path)

# def fetch_internal_data():
#     path = os.path.join("data", "internal", "distribution_simulated.csv")
#     if not os.path.exists(path):
#         raise FileNotFoundError(f"{path} not found.")
#     return pd.read_csv(path)

def fetch_internal_data():
    path = os.path.join("data", "internal", "distribution_simulated.csv")
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found.")
    df = pd.read_csv(path)

    if "country.1" in df.columns:
        df = df.drop(columns=["country.1"])

    return df


def merge_data(external_df, internal_df):
    print("External columns:", external_df.columns.tolist())
    print("Internal columns:", internal_df.columns.tolist())

    # Merge on 'country' and 'year'
    merged = pd.merge(external_df, internal_df, on=["country", "year"], how="inner")
    return merged


