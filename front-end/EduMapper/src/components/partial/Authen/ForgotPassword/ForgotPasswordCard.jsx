import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./forgotPassword.module.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WaitingModal from "../../../global/WaitingModal";
import { FormLabel, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HttpsIcon from '@mui/icons-material/Https';
const defaultTheme = createTheme();

export default function ForgotPasswordCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOTPSuccess, setIsOTPSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isSuccess) {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [isSuccess]);

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value.slice(-1); // Chỉ cho phép nhập 1 chữ số
    setCode(newCode);

    // Focus vào ô tiếp theo nếu có
    if (e.target.value && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email != "") {
      setIsSuccess(true);
    }
    // if (isSuccess == false) {
    //   if (email == null || email.trim().length == 0) {
    //     toast.error("Vui lòng nhập email");
    //     setIsModalOpen(false)
    //     return;
    //   }
    //   setIsModalOpen(true)
    //   const response = await ForgotPasswordApi(email)
    //   if (!response.ok) {
    //     setIsModalOpen(false)
    //     toast.error("Lỗi")
    //     return;
    //   }
    //   const responseJson = await response.json();
    //   if (responseJson.statusCode === 200) {
    //     setIsModalOpen(false)
    //     toast.success("Mã otp đã được gửi đến mail của bạn")
    //     setIsSuccess(true);
    //   } else {
    //     setIsModalOpen(false)
    //     toast.error(responseJson.message)
    //   }
    // } else if (isSuccess == true) {
    //   console.log(email, otp, password, confirmPassword);
    //   setIsModalOpen(true)
    //   const response = await ResetPassword(otp, password, confirmPassword, email)
    //   const responseJson = await response.json();
    //   if (responseJson.statusCode === 204) {
    //     toast.success("Đổi mật khẩu thành công")
    //     window.setTimeout(() => {
    //       window.location.href = "/login"
    //     }, 3000)
    //   } else {
    //     setIsModalOpen(false)
    //     toast.error("Đổi mật khẩu không thành công")
    //   }
    // }
  };
  const handleSubmitOTP = () => {
    setIsOTPSuccess(true);
    setIsSuccess(false);
    alert("Mã xác thực: " + code.join(""));
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              className={styles.headerPass}
            >
              {isSuccess == false && isOTPSuccess == false && (
                <>Quên mật khẩu</>
              )}
              {isSuccess && <>Kiểm tra email</>}
              {isOTPSuccess && <>Thay đổi mật khẩu mới</>}
            </Typography>
            <Typography sx={{ mt: 2 }} className={styles.remind}>
              {isSuccess == false && isOTPSuccess == false && (
                <> Vui lòng điền email để được reset mật khẩu</>
              )}
              {isSuccess && (
                <>
                  Chúng tôi đã gửi mã code tới email contact@dscode...com
                  <br /> Vui lòng điền 5 mã số đã được gửi trong mail
                </>
              )}
              {isOTPSuccess && (
                <>
                  Tạo mật khẩu mới. Chắc chắn rằng mật khẩu mới sẽ không trùng
                  với mật khẩu cũ vì lý do bảo mật
                </>
              )}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {isSuccess == false && isOTPSuccess == false && (
                <>
                  <FormLabel
                    htmlFor="email"
                    sx={{
                      marginBottom: "20px",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Inter",
                      color: "black",
                    }}
                  >
                    Mail của bạn
                  </FormLabel>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: <MailOutlineIcon />,
                    }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đặt lại mật khẩu
                  </Button>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link href="/login" variant="body2">
                      Trở về trang đăng nhập
                    </Link>
                  </div>
                </>
              )}
              {isSuccess && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "20px",
                      maxWidth: "400px",
                      margin: "auto",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      sx={{ mb: 3 }}
                    >
                      {code.map((digit, index) => (
                        <Grid item key={index}>
                          <TextField
                            type="number"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            inputProps={{
                              style: {
                                textAlign: "center",
                                fontSize: "24px",
                              },
                              maxLength: 1,
                              id: `code-${index}`,
                            }}
                            sx={{
                              width: "50px",
                              height: "50px",
                              "& input": {
                                padding: "10px",
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ mb: 2, width: "100%" }}
                      onClick={handleSubmitOTP}
                    >
                      Mã xác thực
                    </Button>
                    <Typography variant="body2">
                      Chưa nhận được mail? <Button>Gửi lại mail</Button>
                    </Typography>
                  </Box>
                </>
              )}
              {isOTPSuccess && (
                <>
                  <FormLabel
                    htmlFor="email"
                    sx={{
                      marginBottom: "20px",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Inter",
                      color: "black",
                    }}
                  >
                    Mật khẩu
                  </FormLabel>
                  <TextField
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    required
                    fullWidth
                    id="password"
                    name="password"
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: <HttpsIcon />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormLabel
                    htmlFor="email"
                    sx={{
                      marginBottom: "20px",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Inter",
                      color: "black",
                    }}
                  >
                    Xác nhận mật khẩu
                  </FormLabel>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: <HttpsIcon />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Cập nhật mật khẩu
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <WaitingModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
}
