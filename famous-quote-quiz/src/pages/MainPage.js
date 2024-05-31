import React, { useState } from 'react';

const MainPage = ({ mode }) => {
  const [quote, setQuote] = useState("To be, or not to be, that is the question.");
  const [author, setAuthor] = useState("William Shakespeare");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer) => {
    const correctAnswer = "William Shakespeare";
    setIsCorrect(answer === correctAnswer);
    setShowAnswer(true);
  };


  return (
    <div>
      <h1>Famous Quote Quiz</h1>
      <p>{quote}</p>
      {!showAnswer ? (
        mode === 'binary' ? (
          <div>
            <button onClick={() => handleAnswer('Yes')}>Yes</button>
            <button onClick={() => handleAnswer('No')}>No</button>
          </div>
        ) : (
          <div>
            <button onClick={() => handleAnswer('William Shakespeare')}>William Shakespeare</button>
            <button onClick={() => handleAnswer('Mark Twain')}>Mark Twain</button>
            <button onClick={() => handleAnswer('Oscar Wilde')}>Oscar Wilde</button>
          </div>
        )
      ) : (
        <div>
          <p>{isCorrect ? "Correct!" : "Sorry, you are wrong!"} The right answer is: {author}</p>
          <button onClick={() => setShowAnswer(false)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;