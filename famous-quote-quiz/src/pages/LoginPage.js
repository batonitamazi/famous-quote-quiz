import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRegistrationForm from '../components/UserRegistrationForm';
import UserLoginForm from '../components/UserLoginForm';

const LoginPage = ({ onRegister, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    onLogin(credentials);
    navigate('/');
  };

  const handleRegister = (user) => {
    onRegister(user);
    setIsRegistering(false);
  };

  return (
    <div>
      {isRegistering ? (
        <>
          <UserRegistrationForm onRegister={handleRegister} />
          <button onClick={() => setIsRegistering(false)}>Already have an account? Login</button>
        </>
      ) : (
        <>
          <UserLoginForm onLogin={handleLogin} />
          <button onClick={() => setIsRegistering(true)}>Don't have an account? Register</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;