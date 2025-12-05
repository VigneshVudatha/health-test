import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SymptomChecker } from './pages/SymptomChecker';
import { RiskPrediction } from './pages/RiskPrediction';
import { AccessFinder } from './pages/AccessFinder';
import { Dashboard } from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/risk" element={<RiskPrediction />} />
          <Route path="/access" element={<AccessFinder />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
