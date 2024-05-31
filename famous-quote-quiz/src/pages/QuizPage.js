import React, { useState, useEffect } from 'react'
import BinaryQuiz from '../components/BinaryQuiz';
import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz';
import QuizResult from '../components/QuizResult';
import { useParams } from 'react-router-dom';

import { useMode } from '../context/modeContext'

function QuizPage() {
    const { mode } = useMode();
    const [quizData, setQuizData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    const { quizId } = useParams();

    const handleNextQuiz = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
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
            const newData = data.find(k => k.id === quizId)
            setQuizData(newData.questions);
        };

        fetchQuizzes();
    }, [mode, quizId]);



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
            {currentIndex < quizData.length && showResult !== true && (
                <button onClick={handleFinishQuiz}>Finish Quiz</button>
            )}
        </div>
    )
}

export default QuizPage