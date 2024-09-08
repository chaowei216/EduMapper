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
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const DoingTest2 = () => {
  const [passages, setPassages] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [currentPassage, setCurrentPassage] = useState(0);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch("/src/data/test2.json"); // Adjust path as necessary
        const data = await response.json();
        setPassages(data.Tests[0].Exams[0].Passages); // Adjust based on your JSON structure
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleSelectChange = (paragraphId, selectedHeading) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [paragraphId]: selectedHeading,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSubmit = () => {
    console.log(selectedAnswers);
  };

  const handlePassageChange = (index) => {
    setCurrentPassage(index);
  };

  const getAnsweredCount = (passageIndex) => {
    return (
      passages[passageIndex]?.SubQuestions.filter(
        (q) => selectedAnswers[q.QuestionId]
      ).length || 0
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">IELTS Reading Test</Typography>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flex: 1, mt: 4, mb: 4 }}>
        {passages[currentPassage] && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {passages[currentPassage].PassageTitle}
            </Typography>
            <Typography paragraph>
              {passages[currentPassage].PassageContent}
            </Typography>

            {/* Loop through all SubQuestions, including heading matching */}
            {passages[currentPassage].SubQuestions.map((question, index) => (
              <Paper
                elevation={2}
                sx={{ padding: 2, mb: 2 }}
                key={question.QuestionId}
              >
                <Typography variant="body1">
                  {index + 1}. {question.QuestionText}
                </Typography>

                {/* Handle multiple-choice questions */}
                {question.QuestionType === "multiple_choice" && (
                  <RadioGroup
                    value={selectedAnswers[question.QuestionId] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.QuestionId, e.target.value)
                    }
                  >
                    {question.Choices.map((option) => (
                      <FormControlLabel
                        key={option.ChoiceId}
                        value={option.ChoiceContent}
                        control={<Radio />}
                        label={option.ChoiceContent}
                      />
                    ))}
                  </RadioGroup>
                )}

                {/* Handle fill-in-the-blank questions */}
                {question.QuestionType === "fill_in_blank" && (
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

                {/* Handle heading matching questions */}
                {question.QuestionType === "heading_matching" && (
                  <>
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      Match the headings with the paragraphs
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      Paragraph {question.QuestionText}
                    </Typography>
                    <div key={question.QuestionId}>
                      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <InputLabel>Select heading</InputLabel>
                        <>
                          <Select
                            value={selectedAnswers[question.QuestionId] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                question.QuestionId,
                                e.target.value
                              )
                            }
                            label="Select heading"
                          >
                            <MenuItem value="">
                              <em>Select heading</em>
                            </MenuItem>
                            {question.Choices.map((heading) => (
                              <MenuItem
                                key={heading.ChoiceId}
                                value={heading.ChoiceId}
                              >
                                {heading.ChoiceContent}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      </FormControl>
                    </div>
                  </>
                )}
              </Paper>
            ))}
          </Box>
        )}

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Submit Test
          </Button>
        </Box>
      </Container>

      <AppBar position="static" color="default" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          {passages.map((passage, index) => (
            <Button
              key={passage.PassageId}
              onClick={() => handlePassageChange(index)}
              variant={currentPassage === index ? "contained" : "outlined"}
              color="primary"
              sx={{ margin: "0 8px" }}
            >
              Part {index + 1}: {getAnsweredCount(index)} OF{" "}
              {passage.SubQuestions.length} QUESTIONS
            </Button>
          ))}
        </Toolbar>
        {passages[currentPassage] && (
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            mb={2}
          >
            {passages[currentPassage].SubQuestions.map((question, index) => (
              <Box
                key={question.QuestionId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: selectedAnswers[question.QuestionId]
                    ? "green"
                    : "grey.300",
                  backgroundColor: selectedAnswers[question.QuestionId]
                    ? "green"
                    : "transparent",
                  color: selectedAnswers[question.QuestionId]
                    ? "white"
                    : "black",
                }}
              >
                {index + 1}
              </Box>
            ))}
          </Box>
        )}
      </AppBar>
    </Box>
  );
};

export default DoingTest2;
