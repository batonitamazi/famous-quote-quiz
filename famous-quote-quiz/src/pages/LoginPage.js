import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, TextField, Button, Link, Box } from '@mui/material';
import { styled } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';


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
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography variant="h4">{isRegistering ? 'Register' : 'Sign in'}</Typography>
        <Grid container spacing={2} mt={2}>
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
              {isRegistering ? 'Sign up' : 'Sign in'}
            </Button>
          </Grid>
        </Grid>
        <Typography mt={2}>
          {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
          <Link href="#" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Sign in' : 'Sign up'}
          </Link>
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default LoginPage;