import React, { useState } from "react";

const BinaryQuiz = ({ quiz, onNextQuiz, onAnswer }) => {
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
    <div>
      <p>{quiz.question}</p>
      <div>
        <button onClick={() => handleAnswer("Yes")} disabled={showAnswer}>
          Yes
        </button>
        <button onClick={() => handleAnswer("No")} disabled={showAnswer}>
          No
        </button>
      </div>
      {showAnswer && (
        <div>
          <p>{quiz.answer === selectedOption ? "Correct!" : "Incorrect!"}</p>
          <p>The correct answer is: {quiz.answer}</p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default BinaryQuiz;
