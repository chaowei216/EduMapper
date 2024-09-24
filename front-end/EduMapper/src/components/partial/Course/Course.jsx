import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";

const Course = ({ courses }) => {
  const handleSendMail = (courseName) => {
    alert(`Gửi yêu cầu tư vấn cho khóa học: ${courseName}`);
  };

  const handleBuyNow = (courseName) => {
    alert(`Mua khóa học: ${courseName}`);
  };

  return (
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={course.imageUrl}
              alt={course.name}
              style={{ objectFit: "cover", height: 200 }}
            />
            <CardContent
              sx={{
                flexGrow: 1,   // Giúp giữ chiều cao ổn định khi nội dung khác nhau
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Địa điểm: {course.location}
              </Typography>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Button
                size="small"
                color="primary"
                onClick={() => handleSendMail(course.name)}
              >
                Xin tư vấn
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => handleBuyNow(course.name)}
              >
                Đăng ký khóa học
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Course;
