import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";
import { MenuBook, Create, Mic } from "@mui/icons-material"; // Import icons từ MUI
import HeadphonesIcon from "@mui/icons-material/Headphones";
import styles from "./TakeTest.module.css"; // Import CSS Module
import { useNavigate } from "react-router-dom";

export default function TakeTestFree() {
  const navigate = useNavigate();
  return (
    <Box className={styles.root}>
      {/* Breadcrumb */}
      <Box className={styles.breadcrumb}>
        <Typography variant="body2">
          <a href="/">Trang chủ</a> / <a href="/take-test">Thi thử</a> / Thi thử miễn
          phí
        </Typography>
      </Box>

      {/* Header Section */}
      <Box className={styles.header}>
        <img
          src="/img/Img-test.png"
          alt="Exam Icon"
          className={styles.examIcon}
        />
        <Box className={styles.titleTest}>
          <Typography variant="h5" color="primary" className={styles.title}>
            Thi Thử
          </Typography>
          <Typography
            mt={2}
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "large", textAlign: "justify" }}
          >
            Chào mừng bạn đến với phần Thi Thử! Đây là nơi bạn có thể kiểm tra
            kiến thức của mình một cách thú vị và hiệu quả. Với các bài thi được
            thiết kế chuyên nghiệp, bạn sẽ có cơ hội trải nghiệm cảm giác như
            trong một kỳ thi thật sự. Chúng tôi cung cấp nhiều chủ đề khác nhau,
            từ ngữ pháp, từ vựng đến các kỹ năng nghe, nói, đọc, viết. Đừng lo
            lắng nếu bạn chưa hoàn hảo, vì đây là một cơ hội tuyệt vời để học
            hỏi và cải thiện bản thân!
          </Typography>
        </Box>
      </Box>

      {/* Premium Test Title */}
      <div className={styles.premiumContainer}>
        <Typography variant="h6" className={styles.premiumTitle}>
          <span role="img" aria-label="crown">
            👑
          </span>{" "}
          Premium Test
        </Typography>
      </div>

      {/* Test Cards */}
      <Grid container spacing={2} justifyContent="center">
        {/* Listening */}
        <Grid item xs={6} sm={3}>
          <Card className={styles.testCard}>
            <HeadphonesIcon className={styles.icon} />
            <Typography variant="h6">Listening</Typography>
            <div className={styles.progressContainer}>
              <CircularProgress variant="determinate" value={50} size={60} />
              <Typography className={styles.progressText}>0%</Typography>
            </div>
            <Button
              variant="contained"
              style={{ background: "#73fbfd" }}
              className={styles.testButton}
              onClick={() => navigate('/listening-test')}
            >
              Take Test
            </Button>
          </Card>
        </Grid>

        {/* Reading */}
        <Grid item xs={6} sm={3}>
          <Card className={styles.testCard}>
            <MenuBook className={styles.icon2} />
            <Typography variant="h6">Reading</Typography>
            <div className={styles.progressContainer}>
              <CircularProgress variant="determinate" value={50} size={60} />
              <Typography className={styles.progressText}>0%</Typography>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{ background: "#73fd91" }}
              className={styles.testButton}
              onClick={() => navigate('/reading-test')}
            >
              Take Test
            </Button>
          </Card>
        </Grid>

        {/* Writing */}
        <Grid item xs={6} sm={3}>
          <Card className={styles.premiumCard}>
            <Create className={styles.icon3} />
            <Typography variant="h6">Writing</Typography>
            <div className={styles.progressContainer}>
              <CircularProgress variant="determinate" value={50} size={60} />
              <Typography className={styles.progressText}>0%</Typography>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{ background: "#f29d38" }}
              className={styles.testButton}
              onClick={() => navigate('/writing-test')}
            >
              Take Test
            </Button>
          </Card>
        </Grid>

        {/* Speaking */}
        <Grid item xs={6} sm={3}>
          <Card className={styles.premiumCard}>
            <Mic className={styles.icon4} />
            <Typography variant="h6">Speaking</Typography>
            <div className={styles.progressContainer}>
              <CircularProgress variant="determinate" value={50} size={60} />
              <Typography className={styles.progressText}>0%</Typography>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{ background: "#ea3ef7" }}
              className={styles.testButton}
              onClick={() => alert('Đã đặt lịch vui lòng chờ Email')}
            >
              Take Test
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* EduMapper Section */}
      <Box className={styles.eduMapperSection}>
        <Typography variant="h6" className={styles.eduMapperTitle}>
          Trải nghiệm trọn vẹn các đặc quyền từ{" "}
          <span className={styles.eduMapperBrand}>EduMapper</span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Trọn bộ 4 kỹ năng
        </Typography>
        <Box className={styles.upgradeImageContainer}>
          <img
            src="/img/Img-Ad.png"
            alt="IELTS"
            className={styles.upgradeImage}
          />
        </Box>
        <Button
          variant="contained"
          color="success"
          className={styles.upgradeButton}
          onClick={() => navigate('/package')}
        >
          Nâng cấp ngay
        </Button>
      </Box>
    </Box>
  );
}
