import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FileListening from "./FileListening";
import SplitPane from "react-split-pane";

export default function ListeningTest(pros) {
  const { passages, currentPassage, selectedAnswers, handleAnswerChange, isPlaying, setIsPlaying } = pros;

  let titleFillBlank = false;

  return (
    <SplitPane split="vertical" minSize={50} defaultSize="100%">
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "60vh" }}>
      {passages[currentPassage] && (
        <div style={{ paddingTop: "1rem", background: "#fff", paddingBottom: "1rem" }}>
          <FileListening passages={passages[currentPassage]} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
      )}
      <Container maxWidth="xl" sx={{ flex: 1, mt: 4, mb: 4 }}>
        {passages[currentPassage] && (
          <Box>
            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
              {passages[currentPassage].passageTitle}
            </Typography>

            {/* Loop through all SubQuestions */}
            {passages && passages[currentPassage]?.subQuestion?.map((question, index) => (
              <Paper elevation={2} sx={{ padding: 2, mb: 2 }} key={question.questionId}>
                <Typography variant="body1">
                  {index + 1}. {question.questionText}
                </Typography>

                {/* Handle multiple-choice questions */}
                {question.questionType === "multiple_choice" && (
                  <RadioGroup
                    value={selectedAnswers.find(answer => answer.questionId === question.questionId)?.userChoice || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.questionId, e.target.value, e.target.value)
                    }
                  >
                    {question.choices.map((option) => (
                      <FormControlLabel
                        key={option.choiceId}
                        value={option.choiceContent}
                        control={<Radio />}
                        label={option.choiceContent}
                      />
                    ))}
                  </RadioGroup>
                )}

                {/* Handle fill-in-the-blank questions */}
                {question.questionType === "fill_in_blank" && (
                  <TextField
                    variant="outlined"
                    value={selectedAnswers.find(answer => answer.questionId === question.questionId)?.userChoice || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.questionId, null, e.target.value) // choiceId là null cho điền vào chỗ trống
                    }
                    style={{ marginRight: "10px" }}
                    size="small"
                  />
                )}

                {/* Handle heading matching questions */}
                {question.questionType === "heading_matching" && (
                  <>
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      Match the headings with the paragraphs
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      Paragraph {question.questionText}
                    </Typography>
                    <div key={question.questionId}>
                      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <InputLabel>Select heading</InputLabel>
                        <Select
                          value={selectedAnswers.find(answer => answer.questionId === question.questionId)?.choiceId || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.questionId, e.target.value, null) // userChoice là null cho câu hỏi này
                          }
                          label="Select heading"
                        >
                          <MenuItem value="">
                            <em>Select heading</em>
                          </MenuItem>
                          {question.choices.map((heading) => (
                            <MenuItem key={heading.choiceId} value={heading.choiceId}>
                              {heading.choiceContent}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </>
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
    </SplitPane>
  );
}
