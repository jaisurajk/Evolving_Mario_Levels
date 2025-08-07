# def clean_data(df):
#     df = df.dropna(subset=['poverty_rate', 'female_teens', 'coverage'])
#     df['poverty_rate'] = df['poverty_rate'].clip(0, 100)
#     return df

# def clean_data(df):
#     # Example: check for missing estimated_need or gni_group
#     required_columns = ['estimated_need', 'gni_group']
#     missing_cols = [col for col in required_columns if col not in df.columns]
#     if missing_cols:
#         raise KeyError(f"Missing required columns: {missing_cols}")

#     return df.dropna(subset=required_columns)

#=================================================================================

"""
clean_data.py

Cleans and standardizes the input DataFrame.
"""

import pandas as pd

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the dataset by handling missing values and normalizing column names.
    
    Args:
        df (pd.DataFrame): Raw input DataFrame.

    Returns:
        pd.DataFrame: Cleaned DataFrame.
    """
    # Normalize column names
    df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

    # Drop completely empty columns
    df = df.dropna(axis=1, how="all")

    # Fill missing numeric values with median
    for col in df.select_dtypes(include='number').columns:
        df[col].fillna(df[col].median(), inplace=True)

    # Fill missing categorical values with mode
    for col in df.select_dtypes(include='object').columns:
        df[col].fillna(df[col].mode()[0], inplace=True)

    return df
