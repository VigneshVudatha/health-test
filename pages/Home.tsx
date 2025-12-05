import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Map, ArrowRight, HeartPulse } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
            AI-Powered Healthcare <br />
            <span className="text-teal-200">At Your Fingertips</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-teal-100">
            Advanced symptom analysis, predictive risk modeling, and instant access to specialized care nearby.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/symptoms"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-teal-700 bg-white hover:bg-teal-50 md:py-4 md:text-lg md:px-10 shadow-lg transition-all hover:scale-105"
            >
              Check Symptoms
            </Link>
            <Link
              to="/risk"
              className="px-8 py-3 border border-teal-200 text-base font-medium rounded-full text-white hover:bg-teal-700 md:py-4 md:text-lg md:px-10 transition-all"
            >
              Assess Risks
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
              <HeartPulse size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Symptom Checker</h3>
            <p className="text-slate-600 mb-6">
              Describe your symptoms in natural language. Our Gemini Flash model provides instant analysis and urgency assessment.
            </p>
            <Link to="/symptoms" className="text-rose-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Start Check <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Risk Prediction</h3>
            <p className="text-slate-600 mb-6">
              Input your lifestyle factors. Gemini Pro evaluates potential health risks and offers personalized prevention strategies.
            </p>
            <Link to="/risk" className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Analyze Risk <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Map size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Access Finder</h3>
            <p className="text-slate-600 mb-6">
              Find specialists nearby using Google Maps Grounding. Get directions, ratings, and immediate contact info.
            </p>
            <Link to="/access" className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Find Doctors <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>

      {/* Stats/Trust Section */}
      <div className="bg-white mt-24 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-slate-500 font-medium">Availability</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-teal-600 mb-2">99%</div>
              <div className="text-slate-500 font-medium">Uptime</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-teal-600 mb-2">AI</div>
              <div className="text-slate-500 font-medium">Powered Analysis</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-teal-600 mb-2">Secure</div>
              <div className="text-slate-500 font-medium">Local Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
