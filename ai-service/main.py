from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging

app = FastAPI(title="CAURN 360 AI Service")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PatientData(BaseModel):
    age: int
    gender: str  # 'M' or 'F'
    grip_strength: float # kg
    dass21_score: int # Total score (0-63)
    chronic_conditions_count: int = 0

class RiskPrediction(BaseModel):
    risk_score: float # 0.0 to 100.0
    risk_level: str # VERDE, AMARELA, VERMELHA
    recommendation: str

@app.get("/")
def read_root():
    return {"status": "online", "service": "CAURN 360 AI Engine"}

def calculate_risk_level(score: float) -> str:
    if score >= 70:
        return "VERMELHA"
    elif score >= 40:
        return "AMARELA"
    else:
        return "VERDE"

@app.post("/predict/risk", response_model=RiskPrediction)
def predict_risk(data: PatientData):
    logger.info(f"Predicting risk for patient: {data}")
    
    # ---------------------------------------------------------
    # EVOQUE METHODOLOGY / MULTIDIMENSIONAL ASSESSMENT LOGIC
    # (Simulating complex ML model logic based on key indicators)
    # ---------------------------------------------------------
    
    base_risk = 10.0 # Baseline risk
    
    # 1. Grip Strength Factor (Sarcopenia indicator)
    # Low grip strength significantly increases hospitalization risk in elderly
    low_grip_threshold = 26.0 if data.gender.upper() == 'M' else 16.0
    
    grip_risk = 0.0
    if data.grip_strength < low_grip_threshold:
        grip_risk = 40.0 # High impact
    elif data.grip_strength < (low_grip_threshold * 1.2):
        grip_risk = 15.0 # Moderate impact
        
    # 2. DASS-21 Factor (Mental Health)
    # High anxiety/depression correlates with higher healthcare utilization
    dass_risk = 0.0
    if data.dass21_score > 20: # Severe
        dass_risk = 30.0
    elif data.dass21_score > 10: # Moderate
        dass_risk = 15.0
        
    # 3. Age Factor
    age_risk = 0.0
    if data.age > 80:
        age_risk = 20.0
    elif data.age > 70:
        age_risk = 10.0

    # 4. Chronic Conditions
    prediction_score = base_risk + grip_risk + dass_risk + age_risk + (data.chronic_conditions_count * 5)
    
    # Cap at 100
    risk_score = min(prediction_score, 100.0)
    risk_level = calculate_risk_level(risk_score)
    
    # Generate Recommendation
    recommendation = ""
    if risk_level == "VERMELHA":
        recommendation = "INTERVENÇÃO IMEDIATA: Encaminhar para Geriatria e Psicologia. Risco alto de fragilidade."
    elif risk_level == "AMARELA":
        recommendation = "MONITORAMENTO: Iniciar programa de fortalecimento muscular e reavaliação em 3 meses."
    else:
        recommendation = "MANUTENÇÃO: Incentivar atividades sociais e físicas regulares. Reavaliação anual."

    return RiskPrediction(
        risk_score=risk_score,
        risk_level=risk_level,
        recommendation=recommendation
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
