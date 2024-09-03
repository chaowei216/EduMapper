import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";

export default function EnglishCenters(pros) {
  const { centers } = pros;
  return (
    <Grid container spacing={3}>
      {centers.map((center, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ display: "flex" }}>
            <CardContent
              sx={{
                flex: 1,
                background: "#F2F2F2",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="h5" color="primary">
                {center.name}
              </Typography>
              <Typography variant="body1">
                <strong>Khu vực hiện tại:</strong> {center.location}
              </Typography>
              <Typography variant="body1">{center.description}</Typography>
              <Typography variant="body1">{center.facilities}</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginRight: 1 }}
                >
                  Thông tin chi tiết
                </Button>
                <Button variant="outlined" color="success">
                  Xem đánh giá
                </Button>
              </Box>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 200, objectFit: "cover" }}
              image={center.imageUrl}
              alt={center.name}
              style={{ borderRadius: "10px" }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
