import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Heart, Zap, Moon } from 'lucide-react';

const healthData = [
  { month: 'Jan', score: 78, activity: 65 },
  { month: 'Feb', score: 82, activity: 70 },
  { month: 'Mar', score: 80, activity: 68 },
  { month: 'Apr', score: 85, activity: 75 },
  { month: 'May', score: 88, activity: 80 },
  { month: 'Jun', score: 92, activity: 85 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Health Dashboard</h2>
        <p className="text-slate-500">Overview of your wellness metrics over time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
            <Heart size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Heart Rate</p>
            <p className="text-2xl font-bold text-slate-900">72 <span className="text-sm font-normal text-slate-400">bpm</span></p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Steps</p>
            <p className="text-2xl font-bold text-slate-900">8,432</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Calories</p>
            <p className="text-2xl font-bold text-slate-900">1,850</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Moon size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Sleep</p>
            <p className="text-2xl font-bold text-slate-900">7h 20m</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Health Score Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Health Score Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0d9488" 
                  strokeWidth={3} 
                  dot={{r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff'}} 
                  activeDot={{r: 8}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Level */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Intensity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                   cursor={{fill: '#f1f5f9'}}
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="activity" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
