import {
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";

const testResults = [
  {
    part: "Part 1: Question 1 - 14",
    questions: [
      { id: 1, userAnswer: "dsa", correctAnswer: "obscure", isCorrect: false },
      { id: 2, userAnswer: "dsa", correctAnswer: "793", isCorrect: false },
      { id: 3, userAnswer: "hello", correctAnswer: "Thanks", isCorrect: false },
      { id: 7, userAnswer: "D", correctAnswer: "D", isCorrect: true },
    ],
  },
  {
    part: "Part 2: Question 15 - 27",
    questions: [
      { id: 15, userAnswer: "YES", correctAnswer: "YES", isCorrect: true },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
    ],
  },
  {
    part: "Part 3: Question 27 - 40",
    questions: [
      { id: 15, userAnswer: "YES", correctAnswer: "YES", isCorrect: true },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
      { id: 16, userAnswer: "YES", correctAnswer: "NO", isCorrect: false },
    ],
  },
];

const totalQuestions = 40;
const correctAnswers = 7;
const timeSpent = "04:39";
const maxTime = "60:00";

const TestResult = () => {
  return (
    <Container style={{ marginBottom: "3rem",marginTop: "3rem" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h4" sx={{ margin: '10px 0' }}>Kết quả bài thi</Typography>
        {/* Phần kết quả */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ marginBottom: 1 }}>Đáp án đúng</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {correctAnswers}/{totalQuestions}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ marginBottom: 1 }}>
                Thời gian làm bài
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {timeSpent} / {maxTime}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Phần đáp án */}
        {testResults.map((section) => (
          <Grid item xs={12} key={section.part}>
            <Typography
              variant="h6"
              sx={{ textAlign: "left", fontWeight: "bold", marginBottom: 2 }}
            >
              {section.part}
            </Typography>
            <Grid container spacing={2}>
              {section.questions.map((q) => (
                <Grid item xs={12} sm={6} md={4} key={q.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: q.isCorrect ? "#e8f5e9" : "#ffebee",
                      padding: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">
                      <b>{q.id}.</b> {q.correctAnswer} : {q.userAnswer}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: q.isCorrect ? "#2e7d32" : "#d32f2f" }}
                    >
                      {q.isCorrect ? "✔" : "✘"}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TestResult;
