import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./forgotPassword.module.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import logoTutor from "/img/logoEdu.png";
import { useState } from "react";
import { ForgotPasswordApi, ResetPassword } from "../../../../api/AuthenApi";
import { toast } from "react-toastify";
const defaultTheme = createTheme();
export default function ForgotPasswordCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSuccess == false) {
      if (email == null || email.trim().length == 0) {
        toast.error("Vui lòng nhập email");
        setIsModalOpen(false);
        return;
      }
      setIsModalOpen(true);
      const response = await ForgotPasswordApi(email);
      if (!response.ok) {
        setIsModalOpen(false);
        toast.error("Lỗi");
        return;
      }
      const responseJson = await response.json();
      if (responseJson.statusCode === 201) {
        setIsModalOpen(false);
        toast.success("Mã otp đã được gửi đến mail của bạn");
        setIsSuccess(true);
      } else {
        setIsModalOpen(false);
        toast.error(responseJson.message);
      }
    } else if (isSuccess == true) {
      console.log(email, otp, password);
      setIsModalOpen(true);
      const response = await ResetPassword(otp, password, email);
      const responseJson = await response.json();
      if (responseJson.statusCode === 200) {
        toast.success("Đổi mật khẩu thành công");
        window.setTimeout(() => {
          window.location.href = "/login";
        }, 2500);
      } else {
        setIsModalOpen(false);
        toast.error("Đổi mật khẩu không thành công");
      }
    }
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="sm"
          className={styles.layout_container}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className={styles.logoTutor}>
              <img src={logoTutor} />
            </div>
            <Typography component="h1" variant="h4">
              Quên mật khẩu
            </Typography>
            {isSuccess == false && (
              <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
                Điền email của bạn và chúng tôi sẽ gửi mã otp đến mail bạn
              </Typography>
            )}
            {isSuccess == true && (
              <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
                Nhập mã OTP và mật khẩu mới
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {isSuccess == false && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: <MailOutlineIcon />,
                  }}
                />
              )}
              {isSuccess == true && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="otp"
                    label="Mã OTP"
                    name="otp"
                    autoComplete="otp"
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: <MailOutlineIcon />,
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Mật khẩu"
                    name="password"
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: <LockOutlinedIcon />,
                    }}
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đồng ý
              </Button>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link href="/login" variant="body2">
                  Trở về trang đăng nhập
                </Link>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
