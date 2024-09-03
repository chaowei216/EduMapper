import { Container, Typography, Grid } from "@mui/material";

const CenterDetail = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" color="green" gutterBottom>
        Trung Tâm Tiếng Anh
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Những trung tâm tiếng anh hàng đầu được nhiều đánh giá cao từ người dùng
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8} style={{paddingLeft: "10px"}}>
          <Typography variant="h5" color="blue">
            Trung tâm Apollo
          </Typography>
          <Typography paragraph>
            Trung tâm Anh ngữ Apollo nổi tiếng không chỉ về chất lượng đào tạo
            mà còn với các dịch vụ hỗ trợ tuyệt vời... Trung tâm Anh ngữ Apollo
            nổi tiếng không chỉ với chất lượng đào tạo hàng đầu mà còn với việc
            chú trọng xây dựng nền tảng kiến thức vững chắc cho học viên. Đặc
            biệt, với đội ngũ giảng viên bản ngữ nhiều năm kinh nghiệm, học sinh
            khi theo học tại đây sẽ được tiếp cận với phương pháp giảng dạy tiên
            tiến, được trau dồi những kiến thức nền tảng vững chắc về ngữ pháp,
            từ vựng và kỹ năng ngôn ngữ.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src="/img/trungtam2.webp"
            alt="Center Image"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CenterDetail;
