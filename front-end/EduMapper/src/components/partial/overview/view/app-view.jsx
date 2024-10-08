import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faUserGraduate,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarEmpty,
  faStarHalfAlt,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./appView.module.css";
import PageNavigation from "../../../global/PageNavigation";
import AppWidgetSummary from "../app-widget-summary";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js

const AppView = () => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true); // DOM đã sẵn sàng
  }, []);

  const [statistics, setStatistics] = useState({
    tutor: 10,
    student: 100,
    transaction: 500,
    revenue: 10000000,
  });

  const [topCourses, setTopCourses] = useState([
    {
      courseName: "Khóa học ở Apolo",
      averageRating: 4.5,
      courseImage: "img/trungtam3.png",
    },
    {
      courseName: "Khóa học ở Vila",
      averageRating: 4.0,
      courseImage: "img/trungtam4.png",
    },
    {
      courseName: "Khóa học ở VUS",
      averageRating: 3.5,
      courseImage: "img/trungtam5.png",
    },
    {
      courseName: "Khóa học ở Ila",
      averageRating: 3.5,
      courseImage: "img/trungtam5.png",
    },
    {
      courseName: "Khóa học ở ngoại ngữ thần đồng",
      averageRating: 3.5,
      courseImage: "img/trungtam5.png",
    },
  ]);

  const [data, setData] = useState([
    {
      newsId: 1,
      title: "Tin tức 1",
      authorName: "Admin",
      createDate: new Date().toLocaleString(),
      image: "/img/trungtam3.png",
    },
    {
      newsId: 2,
      title: "Tin tức 2",
      authorName: "Admin",
      createDate: new Date().toLocaleString(),
      image: "/img/trungtam2.webp",
    },
    {
      newsId: 3,
      title: "Tin tức 3",
      authorName: "Admin",
      createDate: new Date().toLocaleString(),
      image: "/img/trungtam5.png",
    },
  ]);

  // Data for the Donut charts
  const donutData1 = {
    labels: ["Completed Exams"],
    datasets: [
      {
        label: "Completed Exams",
        data: [81, 19],
        backgroundColor: ["#66bb6a", "#e0e0e0"],
      },
    ],
  };

  const donutData2 = {
    labels: ["User Growth"],
    datasets: [
      {
        label: "User Growth",
        data: [22, 78],
        backgroundColor: ["#42a5f5", "#e0e0e0"],
      },
    ],
  };

  const donutData3 = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Revenue",
        data: [62, 38],
        backgroundColor: ["#ffeb3b", "#e0e0e0"],
      },
    ],
  };

  // Data for the Bar chart
  const barData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Users",
        data: [30, 20, 40, 50, 60, 20, 40],
        backgroundColor: "#ff7043",
      },
      {
        label: "Revenue",
        data: [50, 60, 20, 40, 30, 70, 60],
        backgroundColor: "#ffee58",
      },
    ],
  };

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`star-${i}`} icon={faStar} color="gold" />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesomeIcon key="half-star" icon={faStarHalfAlt} color="gold" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-star-${i}`}
          icon={faStarEmpty}
          className={styles.emptyStar}
        />
      );
    }

    return (
      <div className={styles.ratingStars}>
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
        <span className={styles.ratingValue}>{rating}</span>
      </div>
    );
  };

  useEffect(() => {
    // Cleanup function to destroy all charts on unmount
    return () => {
      Chart.getChart("completedExamsChart")?.destroy();
      Chart.getChart("userGrowthChart")?.destroy();
      Chart.getChart("revenueChart")?.destroy();
    };
  }, []);

  return (
    <Container maxWidth="xl" className="mt-2">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Quản lí EduMapper 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Giáo viên"
            total={statistics.tutor}
            color="success"
            icon={<FontAwesomeIcon icon={faChalkboardUser} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Học Viên"
            total={statistics.student}
            color="info"
            icon={<FontAwesomeIcon icon={faUserGraduate} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Giao Dịch"
            total={statistics.transaction}
            color="warning"
            icon={<FontAwesomeIcon icon={faMoneyBillTransfer} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Thu Nhập"
            content="VND"
            total={statistics.revenue}
            color="error"
            icon={<FontAwesomeIcon icon={faMoneyBillTrendUp} />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <div className={styles.lastNews} style={{ marginBottom: "20px" }}>
            <h1>Tin tức mới</h1>
            {data.map((news) => (
              <div key={news.newsId} className={styles.newsBox}>
                <img
                  src={news.image}
                  alt={news.title}
                  className={styles.newsImage}
                />
                <div className={styles.newsContent}>
                  <h3>{news.title}</h3>
                  <p>Người đăng: {news.authorName}</p>
                  <p>Ngày đăng: {news.createDate}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "20px" }}>
              <PageNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6} lg={4} mt={6.5}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Top Courses
              </Typography>
              {topCourses.map((course, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <img
                    src={course.courseImage}
                    alt={course.courseName}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  />
                  <div>
                    <Typography variant="h6">{course.courseName}</Typography>
                    <Typography variant="body2">
                      Rating: {course.averageRating} ⭐
                    </Typography>
                  </div>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Chỉ render Doughnut và Bar khi domReady là true */}
        {domReady && (
          <>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Statistics</Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Doughnut data={donutData1} width={80} height={80} />
                    <Doughnut data={donutData2} width={80} height={80} />
                    <Doughnut data={donutData3} width={80} height={80} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardContent>
                  <Bar data={barData} />
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default AppView;
