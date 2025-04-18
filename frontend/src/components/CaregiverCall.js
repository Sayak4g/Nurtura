import React from 'react';

const CaregiverCall = () => {
  return (
    <section>
      <h2>Contact Caregiver</h2>
      <button onClick={() => alert("Connecting to caregiver...")}>
        Call Now
      </button>
    </section>
  );
};

export default CaregiverCall;
