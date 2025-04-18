import React from 'react';
import './SOSButton.css';

const SOSButton = () => {
  const handleSOS = () => {
    alert("🚨 SOS Alert Sent! Caregivers Notified.");
  };

  return (
    <div className="sos-container">
      <button className="sos-button" onClick={handleSOS}>
        SOS
      </button>
    </div>
  );
};

export default SOSButton;
