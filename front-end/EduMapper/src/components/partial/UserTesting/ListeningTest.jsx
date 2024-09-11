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
export default function ListeningTest(pros) {
  const { passages, currentPassage, selectedAnswers, handleAnswerChange, isPlaying, setIsPlaying } =
    pros;
  let titleFillBlank = false;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "60vh" }}>
    {passages[currentPassage] && (
      <div style={{paddingTop: "1rem", background: "#fff", paddingBottom: "1rem"}}>
        <FileListening passages={passages[currentPassage]} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    )}
      <Container maxWidth="xl" sx={{ flex: 1, mt: 4, mb: 4 }}>
        {passages[currentPassage] && (
          <Box>
            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
              {passages[currentPassage].PassageTitle}
            </Typography>

            {/* Loop through all SubQuestions, including heading matching */}
            {passages[currentPassage].SubQuestions.map((question, index) => (
              <>
                {question.QuestionType === "fill_in_blank" &&
                  !titleFillBlank && (
                    <>
                      {(titleFillBlank = true)}
                      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                        Complete the summary below. <br />
                        Choose ONE WORD ONLY from the passage for each answer.
                      </Typography>
                    </>
                  )}
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
                    <>
                      <TextField
                        variant="outlined"
                        value={selectedAnswers[question.QuestionId] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.QuestionId,
                            e.target.value
                          )
                        }
                        style={{ marginRight: "10px" }}
                        size="small"
                      />
                    </>
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
                        <FormControl
                          fullWidth
                          variant="outlined"
                          sx={{ mt: 2 }}
                        >
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
              </>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
