import axios from 'axios';

const API_BASE_URL = 'https://localhost:7250/Quotes';


export const submitQuizResults = async (quizId, correctCount, incorrectCount, quizDataLength, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/saveUserQuizResult`, {
            quiz_id: Number(quizId),
            correct_answer_count: correctCount,
            incorrect_count: incorrectCount,
            total_questions: quizDataLength
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting quiz results:', error);
        throw error;
    }
};

export const fetchQuizzesByQuizId = async (quizId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${quizId}/withQuestionsAndAnswers`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.questions;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};

export const fetchQuizzesByType = async (mode, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/byType/${mode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};