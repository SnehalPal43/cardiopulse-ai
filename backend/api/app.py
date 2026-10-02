import os
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend communication

# Load the trained machine learning model
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, '../models/model.pkl')

with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend is running successfully!"})

# Prediction route
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features in the exact order required by the model
        features = [
            float(data['age']),
            int(data['sex']),
            int(data['cp']),
            float(data['trestbps']),
            float(data['chol']),
            int(data['fbs']),
            int(data['restecg']),
            float(data['thalach']),
            int(data['exang']),
            float(data['oldpeak']),
            int(data['slope']),
            int(data['ca']),
            int(data['thal'])
        ]
        
        columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
                   'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        
        input_df = pd.DataFrame([features], columns=columns)
        
        # Make predictions and calculate confidence probability
        prediction = model.predict(input_df)
        proba = model.predict_proba(input_df)
        
        result = {
            "prediction": int(prediction[0]),
            "confidence": float(proba[0][prediction[0]] * 100),
            "risk_level": "High Risk" if prediction[0] == 1 else "Low Risk"
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)