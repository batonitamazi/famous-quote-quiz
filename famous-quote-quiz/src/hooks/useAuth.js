import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleRegister = async (newUser) => {
    try {
      await axios.post('https://localhost:7250/Users/register', newUser);
      alert('User registered successfully');
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data)
      alert(error.response.data);
    }
    finally {
      setLoading(false)
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      setLoading(true)
      const response = await axios.post('https://localhost:7250/Users/login', { username, password });
      const { token } = response.data;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('user', JSON.stringify(decodedToken));
      localStorage.setItem('token', token);
      setUser({ username, password, decodedToken });
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data)
      alert(error.response.data);
    }
    finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, loading, error, handleRegister, handleLogin, handleLogout };
};

export default useAuth;
