import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TextField,
} from "@mui/material";

const DoingTest1 = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  // Fetch data từ file JSON
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/src/data/test.json"); // Đọc từ file JSON trong thư mục public
        const data = await response.json();
        setQuestions(data.Passages[0].Questions); // Lưu câu hỏi từ đoạn văn đầu tiên vào state
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSubmit = () => {
    const userAnswers = questions.map((question) => {
      return {
        QuestionId: question.QuestionId,
        UserAnswer: selectedAnswers[question.QuestionId] || "",
        CorrectAnswer: question.CorrectAnswer,
        IsCorrect:
          selectedAnswers[question.QuestionId] === question.CorrectAnswer,
      };
    });

    // Tạo file JSON từ câu trả lời của người dùng
    const userAnswersJson = JSON.stringify(userAnswers, null, 2);

    console.log(userAnswersJson);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h4">IELTS Reading Test</Typography>
        <Typography variant="h6">Time Left: {formatTime(timeLeft)}</Typography>
      </Paper>

      {/* Questions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Part 1: Reading Passage 1 - Undersea Movement
        </Typography>

        {/* Render các câu hỏi từ file JSON */}
        {questions.map((question, index) => (
          <Paper
            elevation={2}
            sx={{ padding: 2, mb: 2 }}
            key={question.QuestionId}
          >
            <Typography variant="body1">
              {index + 1}. {question.QuestionText}
            </Typography>

            {question.QuestionType === "multiple_choice" ? (
              <RadioGroup
                value={selectedAnswers[question.QuestionId] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.QuestionId, e.target.value)
                }
              >
                {question.Choices.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            ) : (
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your answer"
                value={selectedAnswers[question.QuestionId] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.QuestionId, e.target.value)
                }
              />
            )}
          </Paper>
        ))}
      </Box>

      {/* Submit button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Submit Test and Download Answers
        </Button>
      </Box>
    </Container>
  );
};

export default DoingTest1;
