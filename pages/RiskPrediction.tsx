import React, { useState } from 'react';
import { predictHealthRisk } from '../services/geminiService';
import { RiskPredictionResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Loader2, TrendingUp, CheckCircle2 } from 'lucide-react';

export const RiskPrediction: React.FC = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    weight: '',
    height: '',
    smoker: 'No',
    activity: 'Sedentary',
    diet: 'Average',
    familyHistory: ''
  });

  const [prediction, setPrediction] = useState<RiskPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    
    // Construct a profile string
    const profile = `
      Age: ${formData.age}, Gender: ${formData.gender}, 
      Weight: ${formData.weight}kg, Height: ${formData.height}cm, 
      Smoker: ${formData.smoker}, Activity Level: ${formData.activity},
      Diet: ${formData.diet}, Family History: ${formData.familyHistory}
    `;

    try {
      const result = await predictHealthRisk(profile);
      setPrediction(result);
    } catch (err) {
      console.error(err);
      alert("Error generating prediction");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return '#10b981'; // green-500
    if (score < 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const gaugeData = prediction ? [
    { name: 'Risk', value: prediction.riskScore },
    { name: 'Safety', value: 100 - prediction.riskScore },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-teal-600" /> Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Age</label>
                  <input required name="age" type="number" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none" placeholder="Years" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Gender</label>
                  <select name="gender" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Weight (kg)</label>
                  <input required name="weight" type="number" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Height (cm)</label>
                  <input required name="height" type="number" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Smoking</label>
                <select name="smoker" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none">
                  <option>No</option>
                  <option>Yes</option>
                  <option>Occasionally</option>
                  <option>Former Smoker</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Activity Level</label>
                <select name="activity" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none">
                  <option>Sedentary</option>
                  <option>Lightly Active</option>
                  <option>Moderately Active</option>
                  <option>Very Active</option>
                </select>
              </div>

               <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Medical History</label>
                <textarea name="familyHistory" onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-teal-500 outline-none h-20 resize-none" placeholder="Diabetes, Hypertension, etc." />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Calculating...</span> : "Predict Risk"}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-7 lg:col-span-8">
          {!prediction ? (
             <div className="h-full bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 min-h-[400px]">
               <TrendingUp size={48} className="mb-4 opacity-20" />
               <p>Fill out your profile to generate a health risk assessment.</p>
             </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              
              {/* Score Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-8">
                 <div className="relative w-48 h-48 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gaugeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          startAngle={180}
                          endAngle={0}
                          dataKey="value"
                        >
                          <Cell key="risk" fill={getRiskColor(prediction.riskScore)} />
                          <Cell key="safe" fill="#e2e8f0" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                       <span className="text-4xl font-bold text-slate-800">{prediction.riskScore}</span>
                       <span className="text-xs font-semibold uppercase text-slate-500">Risk Score</span>
                    </div>
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{prediction.riskLevel} Risk Profile</h3>
                    <p className="text-slate-600 leading-relaxed">{prediction.summary}</p>
                 </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Personalized Recommendations</h3>
                <div className="space-y-3">
                  {prediction.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <CheckCircle2 className="text-teal-500 mt-1 flex-shrink-0" size={18} />
                      <p className="text-slate-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
