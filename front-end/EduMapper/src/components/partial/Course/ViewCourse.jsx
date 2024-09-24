import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import FilterCourse from "./FilterCourse";
import Course from "./Course";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";

export default function ViewCourse() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState({
    age: "",
    target: "",
    location: "",
    financial: "",
    program: "",
  });

  const courses = [
    {
      name: "Khóa học IELTS cơ bản",
      location: "Hà Nội",
      description: "Khóa học IELTS từ 4.0 đến 6.5+",
      imageUrl: "/img/trungtam3.png",
    },
    {
      name: "Khóa học giao tiếp",
      location: "TP. Hồ Chí Minh",
      description: "Khóa học dành cho người mới bắt đầu",
      imageUrl: "/img/trungtam4.png",
    },
    {
      name: "Khóa học TOEIC cấp tốc",
      location: "Đà Nẵng",
      description: "Khóa học TOEIC từ 500 đến 750+ trong 2 tháng",
      imageUrl: "/img/trungtam5.png",
    },
    {
      name: "Khóa học tiếng Anh cho Cty",
      location: "Hà Nội",
      description: "Khóa học tiếng Anh chuyên biệt cho môi trường kinh doanh",
      imageUrl: "/img/trungtam5.png",
    },
    {
      name: "Khóa học tiếng Anh trẻ em",
      location: "TP. Hồ Chí Minh",
      description: "Khóa học tiếng Anh cho trẻ từ 6 đến 12 tuổi",
      imageUrl: "/img/trungtam2.webp",
    },
    {
      name: "Khóa học IELTS nâng cao",
      location: "Hà Nội",
      description: "Khóa học IELTS từ 6.5+ đến 8.0",
      imageUrl: "/img/trungtam2.webp",
    },
  ];
  

  const handleChangeFilter = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    // Thực hiện logic lọc dữ liệu theo `filter`
    console.log("Filter applied: ", filter);
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ marginTop: "20px", fontWeight: "bold", color: "#4CAF50" }}
      >
        Các Khóa Học Tiếng Anh
      </Typography>
      <Typography mb={3} variant="h6" align="center" gutterBottom>
        Lựa chọn khóa học phù hợp với nhu cầu của bạn
      </Typography>
      <FilterCourse
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        handleFilter={handleFilter}
      />
      <Course courses={courses} />
      {courses.length > 0 && (
        <>
          <div style={{ position: "relative", minHeight: "80px" }}>
            <ul
              style={{
                marginTop: "28px",
                marginBottom: "10px",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <PageNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages || 1}
              />
            </ul>
            <ul style={{ float: "right", marginTop: "12px" }}>
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
            </ul>
          </div>
        </>
      )}
    </Container>
  );
}
