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
        {passages && passages.map((passage, index) => (
          <Button
            key={passage.passageId}
            onClick={() => {
              handlePassageChange(index);
              setIsPlaying(false);
            }}
            variant={currentPassage === index ? "contained" : "outlined"}
            color="primary"
            sx={{ margin: "0 8px" }}
          >
            Part {index + 1}: {getAnsweredCount(index)} OF{" "}
            {passage.subQuestion?.length} QUESTIONS
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
          {passages && passages[currentPassage]?.subQuestion?.map((question, index) => {
            // Kiểm tra xem câu hỏi đã được trả lời hay chưa
            const isAnswered = selectedAnswers.some(
              (answer) => answer.questionId === question.questionId
            );
            return (
              <Box
                key={question.questionId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: isAnswered ? "green" : "grey.300",
                  backgroundColor: isAnswered ? "green" : "transparent",
                  color: isAnswered ? "white" : "black",
                }}
              >
                {index + 1}
              </Box>
            );
          })}
        </Box>
      )}
    </AppBar>
  );
}
