import {
  Box,
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
import SplitPane from "react-split-pane";
import styles from "./ReadingTest.module.css";
import { Scrollbars } from "react-custom-scrollbars";
export default function ReadingTest(pros) {
  const { passages, currentPassage, selectedAnswers, handleAnswerChange } =
    pros;
  let titleFillBlank = false;
  return (
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
              Reading Test
            </Typography>
            <Typography
              mt={2}
              mb={2}
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {passages[currentPassage].PassageTitle}
            </Typography>
            {Object.keys(passages[currentPassage].PassageContent).map(
              (section) => (
                <Typography variant="body2" paragraph key={section}>
                  <strong>{section}.</strong>{" "}
                  {passages[currentPassage].PassageContent[section]}
                </Typography>
              )
            )}
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

                {/* Handle multiple-choice questions */}
                {question.QuestionType === "multiple_choice" && (
                  <RadioGroup
                    value={selectedAnswers.find(
                      (answer) => answer.questionId === question.QuestionId
                    )?.userChoice || ""}
                    onChange={(e) =>
                      handleAnswerChange(
                        question.QuestionId,
                        e.target.value, // choiceId
                        e.target.value // userChoice
                      )
                    }
                  >
                    {question.Choices.map((option) => (
                      <FormControlLabel
                        key={option.ChoiceId}
                        value={option.ChoiceId}
                        control={<Radio />}
                        label={option.ChoiceContent}
                      />
                    ))}
                  </RadioGroup>
                )}

                {/* Handle fill-in-the-blank questions */}
                {question.QuestionType === "fill_in_blank" && (
                  <TextField
                    variant="outlined"
                    value={selectedAnswers.find(
                      (answer) => answer.questionId === question.QuestionId
                    )?.userChoice || ""}
                    onChange={(e) =>
                      handleAnswerChange(
                        question.QuestionId,
                        null, // Không có choiceId cho fill-in-blank
                        e.target.value // userChoice
                      )
                    }
                    style={{ marginRight: "10px" }}
                    size="small"
                  />
                )}

                {/* Handle heading matching questions */}
                {question.QuestionType === "heading_matching" && (
                  <>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      Paragraph {question.QuestionText}
                    </Typography>
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                      <InputLabel>Select heading</InputLabel>
                      <Select
                        value={selectedAnswers.find(
                          (answer) => answer.questionId === question.QuestionId
                        )?.choiceId || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.QuestionId,
                            e.target.value, // choiceId
                            "" // Không có userChoice cho heading_matching
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
                    </FormControl>
                  </>
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Scrollbars>
    </SplitPane>
  );
}
