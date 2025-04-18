import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import EmergencyAlert from './components/EmergencyAlert';
import MedicalForm from './components/MedicalForm';
import DailyTasks from './components/DailyTasks';
import MemoryAid from './components/MemoryAid';
import CaregiverCall from './components/CaregiverCall';
import Accessibility from './components/Accessibility';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import './App.css';  
function App() {
  // Check if user is logged in using Firebase hooks
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading...</div>; // Show loading until Firebase state is resolved

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<EmergencyAlert />} />
        <Route path="/medical" element={<MedicalForm />} />
        <Route path="/tasks" element={<DailyTasks />} />
        <Route path="/memory" element={<MemoryAid />} />
        <Route path="/caregiver" element={<CaregiverCall />} />
        <Route path="/accessibility" element={<Accessibility />} />
        
        {/* Protected Routes - only accessible if logged in */}
        {user && (
          <>
            {/* Add your protected routes here */}
            <Route path="/profile" element={<div>Profile Page</div>} />
          </>
        )}

        {/* Default Route (Redirect to Login if not authenticated) */}
        {!user && <Route path="*" element={<AuthPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
