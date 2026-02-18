
// Utility to interact with the AI Service hosted on Render (or localhost)

export interface PatientData {
    age: number;
    gender: 'M' | 'F';
    grip_strength: number;
    dass21_score: number;
    chronic_conditions_count: number;
}

export interface RiskPrediction {
    risk_score: number;
    risk_level: 'VERDE' | 'AMARELA' | 'VERMELHA';
    recommendation: string;
}

export async function predictRisk(data: PatientData): Promise<RiskPrediction | null> {
    const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${aiServiceUrl}/predict/risk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('Error fetching prediction from AI service:', response.statusText);
            return null;
        }

        const prediction: RiskPrediction = await response.json();
        return prediction;
    } catch (error) {
        console.error('Network error calling AI service:', error);
        return null;
    }
}
