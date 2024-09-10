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

const DoingTest2 = (pros) => {
  const {
    passages,
    selectedAnswers,
    setSelectedAnswers,
    currentPassage,
    handleSubmit,
  } = pros;

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };
  const FillInBlankQuestion = ({ question }) => {
    const parts = question.QuestionText.split(/(\d+\s*_)/);

    return (
      <Paper elevation={2} sx={{ padding: 2, mb: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
          {parts.map((part, index) => {
            if (part.match(/\d+\s*_/)) {
              const num = part.match(/\d+/)[0];
              return (
                <TextField
                  key={index}
                  variant="standard"
                  size="small"
                  sx={{
                    width: "120px",
                    margin: "0 4px",
                    display: "inline-block",
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "transparent",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "transparent",
                    },
                    "& .MuiInputBase-input": {
                      padding: "2px 4px",
                      backgroundColor: "#FFB6C1",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                    },
                  }}
                  value={selectedAnswers[`question_${num}`] || ""}
                  onChange={(e) =>
                    handleAnswerChange(`question_${num}`, e.target.value)
                  }
                />
              );
            } else {
              return (
                <Typography
                  key={index}
                  component="span"
                  variant="body1"
                  sx={{ display: "inline" }}
                >
                  {part}
                </Typography>
              );
            }
          })}
        </Box>
      </Paper>
    );
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
                {question.QuestionType === "fill_in_blank" &&
                  FillInBlankQuestion(question)}

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
    </Box>
  );
};

export default DoingTest2;
