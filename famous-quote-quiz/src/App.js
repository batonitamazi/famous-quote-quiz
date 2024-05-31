import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage"; 
import LoginPage from "./pages/LoginPage";
import useAuth from "./hooks/useAuth";

function App() {
  const [mode, setMode] = useState("binary");
  const { user, handleRegister, handleLogin } = useAuth();

  

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
