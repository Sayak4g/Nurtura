import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="nurtura-header">
      <h1 className="logo">Nurtura</h1>
      <div className="user-icon" onClick={() => navigate('/auth')}>
        <FaUserCircle size={28} />
      </div>
    </header>
  );
};

export default Header;
