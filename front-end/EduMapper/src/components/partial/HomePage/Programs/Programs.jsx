import Slider from "react-slick";
import { Box, Typography, Card, CardContent } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const courses = [
  {
    title: "Khóa học 1",
    price: "3,000,000 vnđ",
    imgSrc: "/img/Rectangle9.png",
  },
  {
    title: "Khóa học 2",
    price: "3,500,000 vnđ",
    imgSrc: "/img/trungtam4.png",
  },
  {
    title: "Khóa học 3",
    price: "3,800,000 vnđ",
    imgSrc: "/img/trungtam5.png",
  },
];

const Programs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Số slide hiển thị trên màn hình lớn
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1528, // Màn hình lớn
        settings: {
          slidesToShow: 2,  // Hiển thị 2 slide trên màn hình lớn
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1028, // Màn hình trung bình
        settings: {
          slidesToShow: 1,  // Hiển thị 1 slide trên màn hình trung bình
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto", paddingTop: 2, marginBottom: "100px" }}>
      <Typography
        sx={{
          color: "#FDFFFE",
          fontFamily: "Inter",
          fontSize: { xs: "24px", sm: "32px", md: "40px" }, // Responsive font size
          fontWeight: 700,
          margin: "25px 0",
        }}
      >
        Khóa học phổ biến
      </Typography>
      <Slider {...settings}>
        {courses.map((course, index) => (
          <Box key={index} sx={{ padding: { xs: "0 5px", sm: "0 10px" } }}>
            <Card sx={{ borderRadius: 12, margin: "0 auto", width: { xs: "90%", sm: "350px", md: "450px" } }}>
              <CardContent sx={{ padding: 0, background: "#CEFFEC" }}>
                <Box
                  component="img"
                  src={course.imgSrc}
                  alt={course.title}
                  sx={{
                    borderRadius: "12px 12px 0 0",
                    height: { xs: "200px", sm: "250px", md: "300px" }, // Responsive height
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <Typography
                  sx={{
                    marginTop: "20px",
                    color: "#053925",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: { xs: "18px", sm: "20px", md: "24px" }, // Responsive font size
                    fontWeight: 700,
                  }}
                >
                  Giá khóa học chỉ:
                </Typography>
                <Typography
                  sx={{
                    color: "#01C2FF",
                    fontFamily: "Inter",
                    fontSize: { xs: "18px", sm: "20px", md: "24px" }, // Responsive font size
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  {course.price}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Programs;
