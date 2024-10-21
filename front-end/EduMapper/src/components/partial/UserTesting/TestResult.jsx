import { Grid, Typography, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { GetResultExam } from "../../../api/ExamApi";

const totalQuestions = 40;
const correctAnswers = 3;
const timeSpent = "04:39";
const maxTime = "60:00";

const TestResult = () => {
  const { examId } = useParams();
  const { user } = useAuth();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await GetResultExam(user.id, examId);
        const data = await response.json();
        const result = data.metaData;
        setDataResult(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchResult();
  }, [examId, user]);

  return (
    <Container style={{ marginBottom: "3rem", marginTop: "3rem" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ margin: "10px 0" }}>
          Kết quả bài thi
        </Typography>

        {/* Phần kết quả */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ marginBottom: 1 }}>Đáp án đúng</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {correctAnswers}/{totalQuestions}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
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
        <Typography variant="h6" sx={{ textAlign: "left", fontWeight: "bold", marginBottom: 2 }}>
          Đáp án chi tiết
        </Typography>

        <Grid container spacing={2}>
          {dataResult.length > 0 && dataResult.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: section.isCorrect ? "#e8f5e9" : "#ffebee",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  marginBottom: 2,
                  display: "flex",  // Thêm display flex
                  flexDirection: "column",  // Đặt các phần tử theo chiều dọc
                  height: "100%"  // Đảm bảo chiều cao 100%
                }}
              >
                <Typography variant="body1">
                  <b>Câu {index + 1}: </b> {section.correctAnswer}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Câu trả lời của bạn:{" "}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ display: "block", marginLeft: 2 }}
                  >
                    {section.userChoice}
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: section.isCorrect ? "#2e7d32" : "#d32f2f", textAlign: "right", marginTop: "auto" }} // Đẩy dấu kiểm/thập xuống đáy
                >
                  {section.isCorrect ? "✔" : "✘"}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestResult;
