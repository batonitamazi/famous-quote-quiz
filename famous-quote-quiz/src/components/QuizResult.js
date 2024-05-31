import React from 'react';
import { Link } from "react-router-dom";

const QuizResult = ({ correctCount, incorrectCount }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Correct Answers: {correctCount}</p>
      <p>Incorrect Answers: {incorrectCount}</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
};

export default QuizResult;