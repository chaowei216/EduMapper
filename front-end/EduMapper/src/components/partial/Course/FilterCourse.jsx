import React from "react";
import { Grid, TextField, MenuItem, Button } from "@mui/material";

const FilterCourse = ({ filter, handleChangeFilter, handleFilter }) => {
  return (
    <Grid container spacing={2} marginBottom={5}>
      <Grid item xs={12} sm={6} md={3} zIndex={0}>
        <TextField
          label="Độ tuổi"
          select
          fullWidth
          value={filter.age || ""}
          onChange={(e) => handleChangeFilter("age", e.target.value)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="6-12">6-12</MenuItem>
          <MenuItem value="13-18">13-18</MenuItem>
          <MenuItem value="18+">18+</MenuItem>
        </TextField>
      </Grid>

      {/* Target mức điểm - Chuyển thành input số */}
      <Grid item xs={12} sm={6} md={3} zIndex={0}>
        <TextField
          label="Target mức điểm"
          type="number"
          fullWidth
          value={filter.target || ""}
          onChange={(e) => handleChangeFilter("target", e.target.value)}
          inputProps={{ min: 0, max: 9 }} // Giới hạn input từ 0 đến 9
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3} zIndex={0}>
        <TextField
          label="Location"
          select
          fullWidth
          value={filter.location || ""}
          onChange={(e) => handleChangeFilter("location", e.target.value)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Hà Nội">Hà Nội</MenuItem>
          <MenuItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</MenuItem>
          <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6} md={3} zIndex={0}>
        <TextField
          label="Tài chính bỏ ra"
          select
          fullWidth
          value={filter.financial || ""}
          onChange={(e) => handleChangeFilter("financial", e.target.value)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="0-5 triệu">0-5 triệu</MenuItem>
          <MenuItem value="5-10 triệu">5-10 triệu</MenuItem>
          <MenuItem value="10+ triệu">10+ triệu</MenuItem>
        </TextField>
      </Grid>

      {/* Chương trình học - Cập nhật các lựa chọn cụ thể */}
      <Grid item xs={12} sm={6} md={3} zIndex={0}>
        <TextField
          label="Chương trình học"
          select
          fullWidth
          value={filter.program || ""}
          onChange={(e) => handleChangeFilter("program", e.target.value)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="IELTS">IELTS</MenuItem>
          <MenuItem value="TOEFL">TOEFL</MenuItem>
          <MenuItem value="TOEIC">TOEIC</MenuItem>
          <MenuItem value="Giao tiếp">Giao tiếp</MenuItem>
          <MenuItem value="Cơ bản">Cơ bản</MenuItem>
        </TextField>
      </Grid>

      {/* Button Lọc - Cập nhật style */}
      <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          fullWidth
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
            fontWeight: "bold",
            padding: "12px 16px",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Lọc
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterCourse;
