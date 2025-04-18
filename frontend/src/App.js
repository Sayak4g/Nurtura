import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import Loader from './components/Loader';

const EmergencyAlert = lazy(() => import('./components/EmergencyAlert'));
const MedicalForm = lazy(() => import('./components/MedicalForm'));
const DailyTasks = lazy(() => import('./components/DailyTasks'));
const MemoryAid = lazy(() => import('./components/MemoryAid'));
const CaregiverCall = lazy(() => import('./components/CaregiverCall'));
const Accessibility = lazy(() => import('./components/Accessibility'));

function App() {
  return (
    <Router>
      <header>
        <h1>Nurtura: Elderly Care Companion</h1>
      </header>
      <nav>
        <a href="/emergency">Emergency</a>
        <a href="/medical">Medical</a>
        <a href="/daily">Daily Tasks</a>
        <a href="/memory">Memory Aid</a>
        <a href="/caregiver">Caregiver</a>
        <a href="/accessibility">Accessibility</a>
      </nav>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/emergency" element={<EmergencyAlert />} />
          <Route path="/medical" element={<MedicalForm />} />
          <Route path="/daily" element={<DailyTasks />} />
          <Route path="/memory" element={<MemoryAid />} />
          <Route path="/caregiver" element={<CaregiverCall />} />
          <Route path="/accessibility" element={<Accessibility />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
