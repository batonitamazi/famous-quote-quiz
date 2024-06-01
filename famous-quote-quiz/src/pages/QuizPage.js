import React, { useState, useEffect, useCallback } from 'react'
import BinaryQuiz from '../components/BinaryQuiz';
import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz';
import QuizResult from '../components/QuizResult';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useMode } from '../context/modeContext'

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
            // If it's the last question, submit the results
            submitQuizResults();
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

    const submitQuizResults = async () => {
        try {
            const response = await axios.post(`https://localhost:7250/Quotes/saveUserQuizResult`, {
                // user_id: userId,
                quiz_id: quizId,
                correct_answer_count: correctCount,
                incorrect_count: incorrectCount,
                total_questions: quizData.length
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Quiz results submitted:', response.data);
        } catch (error) {
            console.error('Error submitting quiz results:', error);
        }
    };


    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(`https://localhost:7250/Quotes/${quizId}/withQuestionsAndAnswers`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setQuizData(response.data.questions);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }, [token, quizId]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);



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