import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const expiryTime = localStorage.getItem('expiryTime');
    if (storedUser && expiryTime && new Date().getTime() < expiryTime) {
      setUser(storedUser);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('expiryTime');
    } 
  }, []);

  const handleRegister = (newUser) => {
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleLogin = ({ username, password }) => {
    const existingUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      const expiryTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem('user', JSON.stringify(existingUser));
      localStorage.setItem('expiryTime', expiryTime);
    } else {
      alert('Invalid credentials');
    }
  };

  return { user, handleRegister, handleLogin };
};

export default useAuth;