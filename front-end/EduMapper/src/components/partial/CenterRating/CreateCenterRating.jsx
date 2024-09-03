import React from "react";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const RatingItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const RatingLabel = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "4px",
});

const fakeData = [
  { label: "Giáo viên", value: 8.2 },
  { label: "Chất lượng giảng dạy", value: 9.5 },
  { label: "Cơ sở vật chất", value: 9.2 },
  { label: "Môi trường học tập", value: 9.6 },
  { label: "Chăm sóc khách hàng", value: 9.0 },
];

function CreateCenterRating() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          Các đánh giá về trung tâm
        </Typography>
        <Typography variant="body1" paragraph>
          Đánh giá của học viên đã học ở trung tâm thông qua EduMapper chúng tôi
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Điểm đánh giá của trung tâm
            </Typography>
            {fakeData.map((item, index) => (
              <RatingItem key={index}>
                <RatingLabel>
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </RatingLabel>
                <LinearProgress
                  variant="determinate"
                  value={item.value * 10}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </RatingItem>
            ))}
          </CardContent>
        </Card>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Nhận xét
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ưu điểm"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Những điểm ngon"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Những điểm yếu"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateCenterRating;
