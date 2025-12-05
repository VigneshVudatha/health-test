export interface SymptomAnalysisResult {
  condition: string;
  probability: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  advice: string;
}

export interface SymptomResponse {
  analysis: SymptomAnalysisResult[];
  disclaimer: string;
}

export interface RiskFactor {
  name: string;
  value: string | number;
}

export interface RiskPredictionResult {
  riskScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  summary: string;
  recommendations: string[];
}

export interface Doctor {
  name: string;
  specialty: string;
  address: string;
  rating?: string;
  distance?: string;
  googleMapsUri?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}
