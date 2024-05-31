import React from 'react';

const QuizResult = ({ correctCount, incorrectCount }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Correct Answers: {correctCount}</p>
      <p>Incorrect Answers: {incorrectCount}</p>
    </div>
  );
};

export default QuizResult;