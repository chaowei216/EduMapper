import React, { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Rating,
  Avatar,
  Divider,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green color for the title
    },
    secondary: {
      main: "#2196f3", // Blue color for progress bars
    },
  },
});

const centerRatingsData = {
  overallRating: 9.1,
  detailedRatings: [
    { label: "Giáo viên", value: 8.2 },
    { label: "Chất lượng giảng dạy", value: 9.5 },
    { label: "Cơ sở vật chất", value: 9.2 },
    { label: "Môi trường học tập", value: 9.6 },
    { label: "Chăm sóc khách hàng", value: 9.0 },
  ],
  reviews: [
    {
      id: 1,
      name: "Người dùng Edu2Review",
      date: "Ngày 29-03-2022",
      rating: 4,
      course: "Đã học khóa học: quản trị kinh doanh tại đây",
      pros: "môi trường năng động, các bài giảng đề hiểu và đồng thời gắn liền với thực tế",
      cons: "quá nhiều cơ sở khiến việc di chuyển giữa các trụ sở khó khăn, nhiều trụ sở còn diện tích xuống cấp",
      fullReview:
        "Trung tâm có môi trường năng động, các bài giảng dễ hiểu và đồng thời gắn liền với thực tế. Giáo viên nhiệt tình và có nhiều kinh nghiệm trong lĩnh vực. Tuy nhiên, quá nhiều cơ sở khiến việc di chuyển giữa các trụ sở khó khăn, và một số trụ sở có diện tích hơi xuống cấp. Nhìn chung, tôi hài lòng với chất lượng đào tạo và sẽ giới thiệu cho bạn bè.",
    },
    {
      id: 2,
      name: "Người dùng Edu2Review",
      date: "Ngày 16-01-2022",
      rating: 5,
      course: "Đã học khóa học: MBA tại đây",
      pros: "Trường có cơ sở vật chất sang, xịn, mịn. Giảng viên dạy thì vô cùng tâm huyết, hòa đồng với sinh viên. Các HD, CLB tổ chức quanh năm những hoạt động bổ ích, cuối cùng là sau khi ra trường thì có",
      cons: "",
      fullReview:
        "Trường có cơ sở vật chất sang, xịn, mịn. Giảng viên dạy thì vô cùng tâm huyết, hòa đồng với sinh viên. Các HD, CLB tổ chức quanh năm những hoạt động bổ ích, cuối cùng là sau khi ra trường thì có nhiều cơ hội việc làm. Chương trình học được thiết kế phù hợp với nhu cầu thị trường, giúp sinh viên dễ dàng áp dụng kiến thức vào công việc thực tế. Tôi rất hài lòng với quyết định học MBA tại đây.",
    },
  ],
};

const RatingBar = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <Typography variant="body2" sx={{ minWidth: 180 }}>
      {label}
    </Typography>
    <Box sx={{ width: "100%", mr: 1 }}>
      <LinearProgress
        variant="determinate"
        value={value * 10}
        color="secondary"
      />
    </Box>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

const Review = ({ name, date, rating, course, pros, cons, fullReview }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar sx={{ mr: 2 }}>{name[0]}</Avatar>
        <Box>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Rating value={rating} readOnly size="small" />
        </Box>
      </Box>
      <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
        {course}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Ưu điểm:</strong> {pros}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Điểm cần cải thiện:</strong> {cons}
      </Typography>
      {fullReview && (
        <>
          {expanded ? (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {fullReview}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {fullReview.slice(0, 100)}...
            </Typography>
          )}
          <Button
            onClick={toggleExpand}
            color="primary"
            sx={{ p: 0, textTransform: "none" }}
          >
            {expanded ? "« thu gọn" : "» xem hết"}
          </Button>
        </>
      )}
    </Box>
  );
};

const CenterRatings = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1700, margin: "auto", marginBottom: "20px" }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Các đánh giá về trung tâm
        </Typography>
        <Typography variant="body2" gutterBottom>
          Đánh giá của học viên đã học ở trung tâm thông qua EduMapper chúng tôi
        </Typography>

        <Box sx={{ bgcolor: "#e8f5e9", p: 2, borderRadius: 1, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Điểm đánh giá của trung tâm
          </Typography>
          {centerRatingsData.detailedRatings.map((rating, index) => (
            <RatingBar key={index} label={rating.label} value={rating.value} />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {centerRatingsData.reviews.map((review, index) => (
          <React.Fragment key={review.id}>
            <Review
              name={review.name}
              date={review.date}
              rating={review.rating}
              course={review.course}
              pros={review.pros}
              cons={review.cons}
              fullReview={review.fullReview}
            />
            {index < centerRatingsData.reviews.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </React.Fragment>
        ))}
      </Paper>
    </ThemeProvider>
  );
};

export default CenterRatings;