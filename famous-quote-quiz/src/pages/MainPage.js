import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { fetchQuizzesByType } from '../api' // Adjust the path as needed
import { useMode } from '../context/modeContext';


const MainPage = () => {
  const [quizData, setQuizData] = useState([]);
  const token = localStorage.getItem('token');
  const { mode } = useMode();

  const fetchQuizzesByMode = useCallback(async () => {
    try {
      const data = await fetchQuizzesByType(mode, token);
      setQuizData(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }, [mode, token]);


  useEffect(() => {
    fetchQuizzesByMode();
  }, [fetchQuizzesByMode]);

  return (
    <div style={{ margin: '2rem', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Available Quizzes
      </Typography>
      <List>
        {quizData?.map((quiz) => (
          <ListItem key={quiz.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: '0.5rem',
            background: '#e3f2fd',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
            ':hover': { boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }
          }}>
            <ListItemText primary={quiz.name} />
            <Button variant="contained" color="primary" component={Link} to={`/quiz/${quiz.id}`}>
              Start Quiz
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MainPage;
