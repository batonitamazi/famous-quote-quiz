import React from 'react';

const SettingsPage = ({ mode, setMode }) => {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>
          <input
            type="radio"
            value="binary"
            checked={mode === 'binary'}
            onChange={() => setMode('binary')}
          />
          Binary (Yes/No)
        </label>
        <label>
          <input
            type="radio"
            value="multiple"
            checked={mode === 'multiple'}
            onChange={() => setMode('multiple')}
          />
          Multiple Choice
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;