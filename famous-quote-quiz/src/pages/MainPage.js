import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const MainPage = ({ mode }) => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`/${mode === 'binary' ? 'binaryQuizzes' : 'multipleChoiceQuizzes'}.json`);
      const data = await response.json();
      setQuizData(data);
    };

    fetchQuizzes();
  }, [mode]);

  return (
    <div style={{ margin: '2rem', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Available Quizzes
      </Typography>
      <List>
        {quizData.map((quiz) => (
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
