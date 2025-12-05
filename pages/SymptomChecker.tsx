import React, { useState } from 'react';
import { analyzeSymptoms } from '../services/geminiService';
import { SymptomResponse } from '../types';
import { AlertCircle, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export const SymptomChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SymptomResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeSymptoms(input);
      setResult(data);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Symptom Checker</h2>
        <p className="text-slate-500 mt-2">Describe what you are feeling, and our AI will provide insights.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <form onSubmit={handleAnalyze} className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Describe your symptoms
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none bg-slate-50"
            placeholder="e.g., I have a throbbing headache on the left side, sensitivity to light, and mild nausea..."
            disabled={loading}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Analyzing...
                </>
              ) : (
                <>
                  Analyze <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
             <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
             <p className="text-sm text-amber-800 font-medium">{result.disclaimer}</p>
          </div>

          <div className="grid gap-6">
            {result.analysis.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{item.condition}</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        Prob: {item.probability}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(item.urgency)}`}>
                        Urgency: {item.urgency}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-2">Recommendation</h4>
                    <p className="text-slate-700">{item.advice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={() => { setResult(null); setInput(''); }}
              className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors"
            >
              <RefreshCw size={16} /> Start New Check
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
