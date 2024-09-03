import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function FilterCenters(pros) {
  const { filter, handleChangeFilter, onFilter } = pros;
  return (
    <>
      <Grid
        mt={3}
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Hình thức học</InputLabel>
            <Select
              label="Hình thức học"
              value={filter.type || ""}
              onChange={(e) => handleChangeFilter("type", e.target.value)}
            >
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="Offline">Học trực tiếp</MenuItem>
              <MenuItem value="Online">Học online</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Khu vực</InputLabel>
            <Select
              label="Khu vực"
              value={filter.location || ""}
              onChange={(e) => handleChangeFilter("location", e.target.value)}
            >
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="HCM">TP. Hồ Chí Minh</MenuItem>
              <MenuItem value="HN">Hà Nội</MenuItem>
              <MenuItem value="DN">Đà Nẵng</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Chương trình học</InputLabel>
            <Select
              label="Chương trình học"
              value={filter.programing || ""}
              onChange={(e) => handleChangeFilter("programing", e.target.value)}
            >
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="General">Chương trình tổng quát</MenuItem>
              <MenuItem value="IELTS">IELTS</MenuItem>
              <MenuItem value="TOEIC">TOEIC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={3} container alignItems="center">
          <Button variant="contained" color="success" fullWidth>
            Lọc
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
