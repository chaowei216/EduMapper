import React from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
  Divider,
} from "@mui/material";
import logoEdu from "/img/logoEdu.png";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import { Image } from "@chakra-ui/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4267B2", // Facebook blue
    },
    secondary: {
      main: "#f0f2f5", // Light gray background
    },
  },
});

const LikeShareButtons = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant="contained"
        startIcon={<ThumbUpAltIcon />}
        sx={{ mr: 1, borderRadius: 20 }}
      >
        Like 40k
      </Button>
      <Button
        variant="contained"
        startIcon={<ShareIcon />}
        sx={{ borderRadius: 20 }}
      >
        Share
      </Button>
    </Box>
  );
};

const FooterSection = ({ title, items, handleButtonClick }) => {
  return (
    <Box sx={{ mb: 3, cursor: "pointer" }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      {items.map((item, index) => (
        <Typography
          key={index}
          onClick={() => handleButtonClick(`${item}`)}
          variant="body2"
          sx={{ mb: 2, fontWeight: "bold", fontSize: "15px" }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
};

const Footer = (pros) => {
  const { handleButtonClick } = pros;
  return (
    <Box component="footer" sx={{ bgcolor: "#D9D9D9", py: 3, mt: "auto" }}>
      <Container maxWidth="lg">
        <LikeShareButtons />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Edumaper
            </Typography>
            <Typography variant="caption">© 2024</Typography>
            <Image
              boxSize="100px"
              width={145}
              objectFit="cover"
              src={logoEdu}
              alt="Dan Abramov"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FooterSection
              title="Danh mục"
              items={[
                "Trang chủ",
                "Tin trung tâm",
                "Thông tin cần biết",
                "Test Online",
              ]}
              handleButtonClick={handleButtonClick}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FooterSection
              title="Tài nguyên"
              items={["Thư viện đề thi", "Blog", "Forum học tập"]}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FooterSection
              title="Liên hệ"
              items={[
                "Địa chỉ: 32, 23 Phú hữu, Quận 9",
                "Điện thoại: 01234559809",
                "Email: Edumaper@gmail.com",
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
