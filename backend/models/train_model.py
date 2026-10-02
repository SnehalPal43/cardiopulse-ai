import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Get absolute path to the current directory and dataset
current_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(current_dir, '../dataset/heart.csv')

# Load the dataset
df = pd.read_csv(dataset_path)

# Separate features and target variable
X = df.drop(columns=['target'])
y = df['target']

# Split data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model performance on test data
preds = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, preds) * 100:.2f}%")

# Save the trained model inside the models folder
model_output_path = os.path.join(current_dir, 'model.pkl')
with open(model_output_path, 'wb') as f:
    pickle.dump(model, f)

print("Model saved successfully as model.pkl!")