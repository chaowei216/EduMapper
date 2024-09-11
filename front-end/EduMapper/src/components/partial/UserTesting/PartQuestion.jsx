import { Box, Button, AppBar, Toolbar } from "@mui/material";
export default function TestProgress(pros) {
  const {
    handlePassageChange,
    getAnsweredCount,
    passages,
    currentPassage,
    selectedAnswers,
    setIsPlaying,
  } = pros;
  return (
    <AppBar
      position="static"
      color="default"
      sx={{ top: "auto", bottom: 0, background: "#fff" }}
    >
      <Toolbar sx={{ justifyContent: "space-around" }}>
        {passages.map((passage, index) => (
          <Button
            key={passage.PassageId}
            onClick={() => {
              handlePassageChange(index);
              setIsPlaying(false);
            }}
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
                color: selectedAnswers[question.QuestionId] ? "white" : "black",
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Box>
      )}
    </AppBar>
  );
}
