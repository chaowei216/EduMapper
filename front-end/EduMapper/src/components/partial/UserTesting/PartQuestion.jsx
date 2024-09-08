import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';

// Giả sử bạn đã import dữ liệu JSON
import testData from '/src/data/test2';

const TestProgress = () => {
  const [currentPassage, setCurrentPassage] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const test = testData.Tests[0];
  const exam = test.Exams[0];
  const passages = exam.Passages;

  const handleQuestionClick = (questionId) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handlePassageChange = (index) => {
    setCurrentPassage(index);
  };

  const getAnsweredCount = (passageIndex) => {
    return passages[passageIndex].SubQuestions.filter(q => answeredQuestions[q.QuestionId]).length;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {passages.map((passage, index) => (
            <Button 
              key={passage.PassageId}
              onClick={() => handlePassageChange(index)} 
              variant={currentPassage === index ? "contained" : "outlined"}
            >
              Part {index + 1}: {getAnsweredCount(index)} of {passage.SubQuestions.length} questions
            </Button>
          ))}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>{exam.ExamName}</Typography>
      
      <Box key={passages[currentPassage].PassageId} sx={{ mb: 2 }}>
        <Typography variant="h6">{passages[currentPassage].PassageTitle}</Typography>
        <Typography paragraph>{passages[currentPassage].PassageContent}</Typography>
        
        <Box display="flex" flexWrap="wrap" gap={2}>
          {passages[currentPassage].SubQuestions.map((question, index) => (
            <Box 
              key={question.QuestionId} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                border: '2px solid',
                borderColor: answeredQuestions[question.QuestionId] ? 'green' : 'grey.300',
                backgroundColor: answeredQuestions[question.QuestionId] ? 'green' : 'transparent',
                color: answeredQuestions[question.QuestionId] ? 'white' : 'black',
                cursor: 'pointer'
              }}
              onClick={() => handleQuestionClick(question.QuestionId)}
            >
              {index + 1}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TestProgress;