import React, { useState } from 'react';

const MultipleChoiceQuiz = ({ quiz, onAnswer, onNextQuiz }) => {
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
    <div>
      <p>{quiz.question}</p>
      {quiz.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={index}
            name="option"
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
            disabled={showAnswer} 
          />
          <label htmlFor={index}>{option}</label>
        </div>
      ))}
      {selectedOption !== null && !showAnswer && (
        <button onClick={handleAnswer}>Submit</button>
      )}
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

export default MultipleChoiceQuiz;