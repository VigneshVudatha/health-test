import { GoogleGenAI, Type } from "@google/genai";
import { SymptomResponse, RiskPredictionResult } from "../types";

// Initialize Gemini Client
// NOTE: process.env.API_KEY is automatically injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes symptoms using Gemini Flash for speed.
 * Returns structured JSON data.
 */
export const analyzeSymptoms = async (symptoms: string): Promise<SymptomResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following symptoms and provide possible conditions, urgency, and advice. 
      Symptoms: ${symptoms}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  condition: { type: Type.STRING },
                  probability: { type: Type.STRING },
                  description: { type: Type.STRING },
                  urgency: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
                  advice: { type: Type.STRING },
                },
                required: ["condition", "probability", "description", "urgency", "advice"],
              },
            },
            disclaimer: { type: Type.STRING },
          },
          required: ["analysis", "disclaimer"],
        },
        systemInstruction: "You are a helpful AI medical assistant. You are not a doctor. Always include a disclaimer that this is not a medical diagnosis.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SymptomResponse;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Symptom Analysis Error:", error);
    throw error;
  }
};

/**
 * Predicts health risks based on lifestyle inputs.
 * Uses Gemini Pro for deeper reasoning on complex factors.
 */
export const predictHealthRisk = async (profile: string): Promise<RiskPredictionResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Using Pro for complex reasoning
      contents: `Evaluate the health risk based on this profile: ${profile}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER, description: "A score from 0 to 100 where 100 is highest risk" },
            riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["riskScore", "riskLevel", "summary", "recommendations"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as RiskPredictionResult;
    }
    throw new Error("No prediction generated");
  } catch (error) {
    console.error("Risk Prediction Error:", error);
    throw error;
  }
};

/**
 * Finds doctors using Google Maps Grounding.
 */
export const findDoctors = async (query: string, location?: { lat: number; lng: number }) => {
  try {
    const toolConfig: any = {};
    if (location) {
      toolConfig.retrievalConfig = {
        latLng: {
          latitude: location.lat,
          longitude: location.lng
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find ${query}. Provide a list of highly rated places.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: toolConfig,
      },
    });

    // We return the full response object to process grounding chunks in the UI
    return response;
  } catch (error) {
    console.error("Doctor Search Error:", error);
    throw error;
  }
};
