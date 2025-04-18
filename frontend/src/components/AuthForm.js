import React, { useState } from 'react';
import './AuthForm.css';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isSignup ? 'Signup' : 'Login'} successful for ${formData.email}`);
    // Handle manual login/signup logic here
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
      console.log("Google Login Success:", user);
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed!");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Create Account' : 'Login'}</h2>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-button">
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>

        <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p className="auth-toggle">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
