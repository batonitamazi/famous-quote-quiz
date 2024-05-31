import React, { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [mode, setMode] = useState("binary");
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const expiryTime = localStorage.getItem("expiryTime");
    if (storedUser && expiryTime && new Date().getTime() < expiryTime) {
      setUser(storedUser);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("expiryTime");
    }
  }, []);

  const handleRegister = (user) => {
    setRegisteredUsers((prev) => [...prev, user]);
  };

  const handleLogin = ({ username, password }) => {
    const user = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setUser(user);
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (user) {
      const expiryTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("expiryTime", expiryTime);
    }
  }, [user]);

  const ProtectedRoute = ({ children }) => {
    console.log(user)
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainPage mode={mode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage mode={mode} setMode={setMode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={<LoginPage onRegister={handleRegister} onLogin={handleLogin} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
