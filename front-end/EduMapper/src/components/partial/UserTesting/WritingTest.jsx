import { Box, Paper, TextField, Typography, Button, Grid } from "@mui/material";
import SplitPane from "react-split-pane";
import styles from "./ReadingTest.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";

export default function WritingTest(prop) {
  const { passages, currentPassage, selectedAnswers, handleAnswerChange } =
    prop;
  const [wordCounts, setWordCounts] = useState({});

  // Hàm để đếm số từ
  const countWords = (text) => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  // Hàm xử lý khi bấm nút "Count Words"
  const handleCountWords = (questionId, text) => {
    setWordCounts((prevCounts) => ({
      ...prevCounts,
      [questionId]: countWords(text),
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "77.5vh" }}>
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize="50%"
        maxSize={-100}
        style={{ position: "relative", height: "77.5vh" }}
        paneStyle={{ overflowY: "auto", padding: "4px" }}
        resizerClassName={styles.customResizer}
      >
        <Scrollbars>
          {passages[currentPassage] && (
            <Box style={{ backgroundColor: "#f5f5f5", padding: "15px" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Writing Test
              </Typography>
              <Typography
                mt={2}
                mb={2}
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {passages[currentPassage].PassageTitle}
              </Typography>
              <Typography variant="body2" paragraph>
                {passages[currentPassage].PassageContent.TaskDescription}
              </Typography>
            </Box>
          )}
        </Scrollbars>

        <Scrollbars>
          {passages[currentPassage] && (
            <Box style={{ backgroundColor: "#fff", padding: "15px" }}>
              {passages[currentPassage].SubQuestions.map((question, index) => (
                <Paper
                  elevation={2}
                  sx={{ padding: 2, mb: 2 }}
                  key={question.QuestionId}
                >
                  <Typography variant="body1">
                    {index + 1}. {question.QuestionText}
                  </Typography>

                  {/* Ô nhập liệu cho câu trả lời của Task 1 và Task 2 */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={18}
                    placeholder={`Your answer (minimum ${question.WordLimit} words)`}
                    value={
                      selectedAnswers.find(
                        (answer) => answer.questionId === question.QuestionId
                      )?.userChoice || ""
                    }
                    onChange={(e) => {
                      const text = e.target.value; // Giữ cả chuỗi có xuống dòng
                      handleAnswerChange(question.QuestionId, text);
                    }}
                  />

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          const text =
                            selectedAnswers.find(
                              (answer) =>
                                answer.questionId === question.QuestionId
                            )?.userChoice || "";
                          handleCountWords(question.QuestionId, text);
                        }}
                      >
                        Count Words
                      </Button>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right" }}>
                      <Typography variant="caption">
                        Word Count: {wordCounts[question.QuestionId] || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}
        </Scrollbars>
      </SplitPane>
    </Box>
  );
}
