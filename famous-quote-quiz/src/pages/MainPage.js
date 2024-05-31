import React, {useState, useEffect} from 'react';
import BinaryQuiz from '../components/BinaryQuiz';
import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz';
import QuizResult from '../components/QuizResult';


const MainPage = ({ mode }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleNextQuiz = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex;
    });
    setShowResult(false);
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectCount((prevCount) => prevCount + 1);
    }
  };


  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`/${mode === 'binary' ? 'binaryQuizzes' : 'multipleChoiceQuizzes'}.json`);
      const data = await response.json();
      setQuizData(data);
    };

    fetchQuizzes();
  }, [mode]);
  
  return (
    <div>
    {currentIndex < quizData.length && !showResult ? (
      <div key={currentIndex}> 
        {mode === 'binary' ? 
          <BinaryQuiz 
            quiz={quizData[currentIndex]} 
            onNextQuiz={handleNextQuiz} 
            onAnswer={handleAnswer} 
          /> : 
          <MultipleChoiceQuiz 
            quiz={quizData[currentIndex]} 
            onNextQuiz={handleNextQuiz} 
            onAnswer={handleAnswer} 
          />
        }
      </div>
    ) : (
      <QuizResult 
        correctCount={correctCount} 
        incorrectCount={incorrectCount} 
      />
    )}
    {currentIndex < quizData.length && showResult !== true &&  (
      <button onClick={handleFinishQuiz}>Finish Quiz</button>
    )}
  </div>
  );
};

export default MainPage;