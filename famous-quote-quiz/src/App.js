import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./hooks/useAuth";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState("binary");
  const { user, loading, handleLogout, handleRegister, handleLogin } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
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
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
          path="/quiz/:quizId"
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
