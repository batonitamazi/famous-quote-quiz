import React, {useState, useEffect} from 'react';
import BinaryQuiz from '../components/BinaryQuiz';
import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz';
import QuizResult from '../components/QuizResult';



const binaryQuizzes = [
  {
    id: "01",
    question: "The only thing we have to fear is fear itself.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "02",
    question: "I think, therefore I am.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "03",
    question: "That's one small step for man, one giant leap for mankind.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "04",
    question: "In the beginning God created the heavens and the earth.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "05",
    question: "To be, or not to be, that is the question.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "06",
    question: "I have a dream.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "07",
    question: "The unexamined life is not worth living.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "08",
    question: "E=mc²",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "09",
    question: "The only way to do great work is to love what you do.",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    id: "10",
    question: "The journey of a thousand miles begins with one step.",
    options: ["Yes", "No"],
    answer: "Yes"
  }
];

const nonBinaryQuizzes = [
  {
    id: "11",
    question: "What is a state in React?",
    options: [
      "A permanent storage.",
      "Internal storage of the component.",
      "External storage of the component.",
      "None of the above."
    ],
    answer: "Internal storage of the component."
  },
  {
    id: "12",
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "JSON XML",
      "JavaScript Extension",
      "None of the above."
    ],
    answer: "JavaScript XML"
  },
  {
    id: "13",
    question: "What function is used to render a component?",
    options: [
      "renderComponent()",
      "mountComponent()",
      "createComponent()",
      "None of the above."
    ],
    answer: "None of the above."
  },
  {
    id: "14",
    question: "Which method is used to change the state of a component?",
    options: [
      "setState()",
      "changeState()",
      "stateChange()",
      "None of the above."
    ],
    answer: "setState()"
  },
  {
    id: "15",
    question: "What is the correct way to import a React component?",
    options: [
      "import { MyComponent } from 'MyComponent.js';",
      "require MyComponent from 'MyComponent.js';",
      "include MyComponent from 'MyComponent.js';",
      "None of the above."
    ],
    answer: "import { MyComponent } from 'MyComponent.js';"
  }
];

const MainPage = ({ mode }) => {
  // const [quizData, setQuizData] = useState(mode === 'binary' ? binaryQuizzes : nonBinaryQuizzes);
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