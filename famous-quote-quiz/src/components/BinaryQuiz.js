import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';

const BinaryQuiz = ({ quiz, onNextQuiz, onAnswer, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswer = (value) => {
    if (value !== null) {
      setShowAnswer(true);
      setSelectedOption(value);
      onAnswer(value === quiz.answer);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    onNextQuiz();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>{quiz.question}</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAnswer("Yes")}
            disabled={showAnswer}
            sx={{ marginRight: 2 }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleAnswer("No")}
            disabled={showAnswer}
          >
            No
          </Button>
        </Box>
        {showAnswer && (
          <Box mt={2} textAlign="center">
            <Typography variant="body1" color={quiz.answer === selectedOption ? 'success' : 'error'}>
              {quiz.answer === selectedOption ? "Correct!" : "Incorrect!"}
            </Typography>
            <Typography variant="body2">The correct answer is: {quiz.answer}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ marginTop: 2 }}
            >
              {isLastQuestion ? "Finish Quiz" : "Next"}

            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default BinaryQuiz;
