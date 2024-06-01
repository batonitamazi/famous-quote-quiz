import React, { useState } from 'react';
import {
  Radio,
  FormControlLabel,
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';

const MultipleChoiceQuiz = ({ quiz, onAnswer, onNextQuiz, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswer = () => {
    if (selectedOption !== null) {
      setShowAnswer(true);
      onAnswer(selectedOption === quiz.answer);
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
        {quiz.options.map((option, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#e3f2fd',
              padding: 1,
              borderRadius: 4,
              marginBottom: 1,
            }}
          >
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  disabled={showAnswer}
                />
              }
              label={option}
            />
          </Box>
        ))}
        <Box mt={2} textAlign="center">
          {!showAnswer && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAnswer}
              disabled={selectedOption === null}
            >
              Submit
            </Button>
          )}
          {showAnswer && (
            <>
              <Typography variant="body1" color={quiz.answer === selectedOption ? 'success' : 'error'}>
                {quiz.answer === selectedOption ? "Correct!" : "Incorrect!"}
              </Typography>
              <Typography variant="body2">The correct answer is: {quiz.answer}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {isLastQuestion ? "Finish Quiz" : "Next"}
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default MultipleChoiceQuiz;
