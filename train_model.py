# import pandas as pd
# from sklearn.linear_model import LinearRegression
# from joblib import dump
# from config import MODEL_PATH

# # Load merged + cleaned + feature-engineered data manually
# df = pd.read_csv('output/merged_features.csv')  # you can use output from your pipeline
# X = df[['need_index']]
# y = df['coverage']

# model = LinearRegression()
# model.fit(X, y)

# # Save model
# dump(model, MODEL_PATH)
# print(f"Model saved to {MODEL_PATH}")

"""
train_model.py

Trains a machine learning model on the engineered dataset.
"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

def train_model(df: pd.DataFrame, target_column: str = "label") -> None:
    """
    Train a Random Forest model and save it to disk.
    
    Args:
        df (pd.DataFrame): DataFrame with features and label.
        target_column (str): Name of the label column.
    """
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in DataFrame.")

    # Drop non-numeric or identifier columns
    X = df.drop(columns=[target_column])
    X = pd.get_dummies(X, drop_first=True)  # Encode categoricals

    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print("Model Evaluation:")
    print(classification_report(y_test, y_pred))

    # Save model
    joblib.dump(model, "models/random_forest_model.pkl")
    print("✅ Model saved to models/random_forest_model.pkl")

