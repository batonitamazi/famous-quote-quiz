import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [mode, setMode] = useState('binary');

    return (
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<MainPage mode={mode} />} />
          <Route path="/settings" element={<SettingsPage mode={mode} setMode={setMode} />} />
        </Routes>
      </Router>
    );
}

export default App;
