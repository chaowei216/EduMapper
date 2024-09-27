import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5, background: "#fef4f4", pb: 2, mb: 3 }}>
        {/* Section quảng cáo */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src="/img/trungtam3.png"
              alt="English Center"
              style={{ width: "100%", borderRadius: "10px", height: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ backgroundColor: "#fef4f4", p: 4, borderRadius: "10px" }}
            >
              <Typography variant="h5" gutterBottom>
                Bạn cần hỗ trợ?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Trung tâm tiếng Anh của chúng tôi luôn sẵn sàng giúp bạn. Hãy
                điền thông tin để chúng tôi có thể hỗ trợ bạn trong thời gian
                sớm nhất.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Họ tên"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Tin nhắn"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                      required
                      sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        size="large"
                      >
                        Gửi liên hệ
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>

        {/* Phần thông tin liên hệ và bản đồ */}
        <Grid container spacing={4} sx={{ mt: 5 }}>
          {/* Bản đồ Google Maps */}
          <Grid item xs={12} md={6}>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5276825719357!2d105.79954441500772!3d21.008455393805834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8d0c2d1c91%3A0x24b7bfb5e47333ab!2zVHLGsOG7nW5nIFRydW5nIENhbSBIdXkgVGnhur9uZywgUXXhuq1jIFPGoSBN4bqhaSBIw6BuZw!5e0!3m2!1svi!2s!4v1639120950123!5m2!1svi!2s"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            />
          </Grid>
          {/* Card thông tin liên hệ */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#fef4f4" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trung tâm tiếng Anh ABC
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <LocationOn />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Số 123 Đường ABC, Quận XYZ, TP.HCM
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                  <Grid item>
                    <Phone />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Điện thoại: 0909 123 456
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                  <Grid item>
                    <Email />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Email: info@englishcenter.com
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
