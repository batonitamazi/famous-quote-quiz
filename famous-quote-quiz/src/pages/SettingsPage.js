import React from 'react';
import { useMode } from '../context/modeContext';
import { Typography, FormControlLabel, Switch, Grid } from '@mui/material';

const SettingsPage = () => {
  const { mode, setMode } = useMode();

  const handleChange = () => {
    setMode(mode === 'binary' ? 'multiplechoice' : 'binary');
  };

  return (
    <div style={{ padding: '20px', margin: 'auto' }}>
      <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
        Settings
      </Typography>
      <Grid container alignItems="center" spacing={1}>

        <Grid item>Binary (Yes/No)</Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch checked={mode === 'multiplechoice'} onChange={handleChange} />}
          />
        </Grid>
        <Grid item>Multiple Choice</Grid>
      </Grid>
    </div>
  );
};

export default SettingsPage;
