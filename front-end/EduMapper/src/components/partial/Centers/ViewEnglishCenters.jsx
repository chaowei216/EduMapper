import React, { useState } from "react";
import EnglishCenters from "./EnglishCenters";
import { Container, Typography } from "@mui/material";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import FilterCenters from "./FilterCenters";

export default function ViewEnglishCenters() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [filter, setFilter] = useState({
    type: "",
    location: "",
    programing: "",
  });
  const handleChangeFilter = (field, value) => {
    setFilter((pre) => ({
      ...pre,
      [field]: value,
    }));
  };
  const centers = [
    {
      name: "Trung tâm Apollo",
      location: "TP. Hồ Chí Minh, Hà Nội, Đà Nẵng",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "/img/trungtam4.png",
    },
    {
      name: "Trung tâm tiếng Anh ILA",
      location: "Hệ thống trên toàn quốc",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "/img/trungtam2.webp",
    },
    {
      name: "Trung tâm tiếng Anh ILA",
      location: "Hệ thống trên toàn quốc",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "/img/trungtam5.png",
    },
    {
      name: "Trung tâm tiếng Anh ILA",
      location: "Hệ thống trên toàn quốc",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "/img/trungtam4.png",
    },
    {
      name: "Trung tâm tiếng Anh ILA",
      location: "Hệ thống trên toàn quốc",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "/img/trungtam3.png",
    },
  ];
  return (
    <>
      <Container style={{marginTop: "40px"}}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ marginTop: "20px", fontWeight: "bold", color: "#4CAF50" }}
        >
          Trung Tâm Tiếng Anh
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Những trung tâm tiếng anh hàng đầu được nhiều đánh giá cao từ người
          dùng
        </Typography>
        <FilterCenters
          filter={filter}
          handleChangeFilter={handleChangeFilter}
        />
        <EnglishCenters centers={centers} />
        {centers && centers.length > 0 && (
          <>
            <div
              style={{
                position: "relative",
                minHeight: "80px",
              }}
            >
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
                  totalPages={totalPages || "1"}
                />
              </ul>
              <ul style={{ float: "right", marginTop: "12px" }}>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              </ul>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
