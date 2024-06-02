import React, { useState, useEffect, useCallback } from 'react'
import BinaryQuiz from '../components/BinaryQuiz';
import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz';
import QuizResult from '../components/QuizResult';
import { useParams } from 'react-router-dom';
import { useMode } from '../context/modeContext'
import { submitQuizResults, fetchQuizzesByQuizId } from '../api'



function QuizPage() {
    const { mode } = useMode();
    const [quizData, setQuizData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const token = localStorage.getItem('token');


    const { quizId } = useParams();

    const handleNextQuiz = () => {
        if (currentIndex === quizData.length - 1) {
            handleSubmit();
            setShowResult(true);
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setShowResult(false);
        }
    };


    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setCorrectCount((prevCount) => prevCount + 1);
        } else {
            setIncorrectCount((prevCount) => prevCount + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            await submitQuizResults(quizId, correctCount, incorrectCount, quizData.length, token);
        } catch (error) {
            console.error('Error submitting quiz results:', error);
        }
    };


    const fetchQuizzesById = useCallback(async () => {
        try {
            const data = await fetchQuizzesByQuizId(quizId, token);
            setQuizData(data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }, [quizId, token]);



    useEffect(() => {
        fetchQuizzesById();
    }, [fetchQuizzesById]);



    return (
        <div>
            {currentIndex < quizData.length && !showResult ? (
                <div key={currentIndex}>
                    {mode === 'binary' ?
                        <BinaryQuiz
                            quiz={quizData[currentIndex]}
                            onNextQuiz={handleNextQuiz}
                            onAnswer={handleAnswer}
                            isLastQuestion={currentIndex === quizData.length - 1}
                        /> :
                        <MultipleChoiceQuiz
                            quiz={quizData[currentIndex]}
                            onNextQuiz={handleNextQuiz}
                            onAnswer={handleAnswer}
                            isLastQuestion={currentIndex === quizData.length - 1}
                        />
                    }
                </div>
            ) : (
                <QuizResult
                    correctCount={correctCount}
                    incorrectCount={incorrectCount}
                />
            )}
        </div>
    )
}

export default QuizPage