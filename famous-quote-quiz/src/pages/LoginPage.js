import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  marginTop: '20px',
});


const LoginPage = ({ onRegister, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ username, password });
    navigate('/');
    setUsername('');
    setPassword('');
  };

  const handleRegister = () => {
    onRegister({ username, password });
    setIsRegistering(false);
    setUsername('');
    setPassword('');
  };
  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Typography variant="h4">{isRegistering ? 'Register' : 'Login'}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={isRegistering ? handleRegister : handleLogin}
              variant="contained"
              color="primary"
            >
              {isRegistering ? 'Register' : 'Login'}
            </Button>
          </Grid>
        </Grid>
        <Typography>
          {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
          <Link href="#" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </Link>
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default LoginPage;