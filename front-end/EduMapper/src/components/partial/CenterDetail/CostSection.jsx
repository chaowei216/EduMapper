import { Box, Typography } from "@mui/material";

const CostSection = () => (
  <Box mt={4}>
    <Typography variant="h6" color="blue" gutterBottom>
      Chi phí
    </Typography>
    <Typography paragraph sx={{fontWeight: "bold"}}>
      Đối với các chương trình trẻ từ 3-13 tuổi...
    </Typography>
    {/* Add more details as needed */}
    <Typography paragraph>
      + Mức học phí 7.920.000đ/khóa với số giờ học là 36 giờ. <br/>
      + Mức học phí 14.400.000đ/khóa có số giờ học là 72 giờ, gấp đôi số giờ khóa trước. <br/>
      + Mức học phí 20.520.000đ/khóa có số giờ học tương ứng là 108 giờ/khóa.
    </Typography>
  </Box>
);

export default CostSection;
