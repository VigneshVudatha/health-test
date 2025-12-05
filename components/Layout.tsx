import React from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Health Access & Predict. This application is for educational and demonstration purposes only.</p>
          <p className="mt-2 text-xs text-slate-400">Powered by Gemini 2.5 Flash & Pro</p>
        </div>
      </footer>
    </div>
  );
};
