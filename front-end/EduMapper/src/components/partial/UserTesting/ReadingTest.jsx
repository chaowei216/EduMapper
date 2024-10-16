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
        <div style={{ height: "100%", backgroundColor: "#f5f5f5"}}>
        {passages && passages[currentPassage] && (
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
              {passages[currentPassage].passageTitle}
            </Typography>
            <Typography style={{fontSize: "16px"}} variant="body2" paragraph textAlign={"justify"}>
              {passages[currentPassage].passageContent}
            </Typography>
            {passages &&
              passages[currentPassage]?.sections != [] &&
              passages[currentPassage]?.sections?.map((section, index) => (
                <Typography style={{fontSize: "16px"}} variant="body2" paragraph key={section.sectionLabel || index} textAlign={"justify"}>
                  <strong>{section.sectionLabel}.</strong>{" "}
                  {section.sectionContent}
                </Typography>
              ))}
          </Box>
        )}
        </div>
      </Scrollbars>
      <Scrollbars>
        {passages[currentPassage] && (
          <Box style={{ backgroundColor: "#fff", padding: "15px" }}>
            {passages &&
              passages[currentPassage]?.subQuestion?.map((question, index) => (
                <Paper
                  elevation={2}
                  sx={{ padding: 2, mb: 2 }}
                  key={question.questionId}
                >
                  <Typography variant="body1">
                    {index + 1}. {question.questionText}
                  </Typography>

                  {/* Handle multiple-choice questions */}
                  {question.questionType === "multiple_choice" && (
                    <>
                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Multple Choice
                      </Typography>
                      <RadioGroup
                        key={index + 2}
                        value={
                          selectedAnswers.find(
                            (answer) =>
                              answer.questionId === question.questionId
                          )?.userChoice || ""
                        }
                        onChange={(e) =>
                          handleAnswerChange(
                            question.questionId,
                            e.target.value, // choiceId
                            e.target.value // userChoice
                          )
                        }
                      >
                        {question.choices.map((option) => (
                          <FormControlLabel
                            key={option.choiceId}
                            value={option.choiceId}
                            control={<Radio />}
                            label={option.choiceContent}
                          />
                        ))}
                      </RadioGroup>
                    </>
                  )}

                  {/* Handle fill-in-the-blank questions */}
                  {question.questionType === "fill_in_blank" && (
                    <>
                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Fill in blank
                      </Typography>
                      <TextField
                        key={index + 3}
                        variant="outlined"
                        value={
                          selectedAnswers.find(
                            (answer) =>
                              answer.questionId === question.questionId
                          )?.userChoice || ""
                        }
                        onChange={(e) =>
                          handleAnswerChange(
                            question.questionId,
                            null, // Không có choiceId cho fill-in-blank
                            e.target.value // userChoice
                          )
                        }
                        style={{ marginRight: "10px" }}
                        size="small"
                      />
                    </>
                  )}

                  {/* Handle heading matching questions */}
                  {question.questionType === "heading_matching" && (
                    <>
                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Paragraph {question.questionText}
                      </Typography>
                      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <InputLabel>Select heading</InputLabel>
                        <Select
                          key={index + 4}
                          value={
                            selectedAnswers.find(
                              (answer) =>
                                answer.questionId === question.questionId
                            )?.choiceId || ""
                          }
                          onChange={(e) =>
                            handleAnswerChange(
                              question.questionId,
                              e.target.value, // choiceId
                              "" // Không có userChoice cho heading_matching
                            )
                          }
                          label="Select heading"
                        >
                          <MenuItem value="">
                            <em>Select heading</em>
                          </MenuItem>
                          {question?.choices.map((heading) => (
                            <MenuItem
                              key={heading.choiceId}
                              value={heading.choiceId}
                            >
                              {heading.choiceContent}
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
