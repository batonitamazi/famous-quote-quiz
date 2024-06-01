import React from 'react';
import { Link } from "react-router-dom";
import { Typography, Container, Paper, Button } from '@mui/material';

const QuizResult = ({ correctCount, incorrectCount }) => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>Quiz Results</Typography>
        <div>
          <Typography variant="body1" gutterBottom>Correct Answers: {correctCount}</Typography>
          <Typography variant="body1" gutterBottom>Incorrect Answers: {incorrectCount}</Typography>
        </div>
        <Button variant="contained" color="primary" component={Link} to="/">Go back to home</Button>
      </Paper>
    </Container>
  );
};

export default QuizResult;
