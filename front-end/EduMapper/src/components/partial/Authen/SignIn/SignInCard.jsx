import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useAuth from "../../../../hooks/useAuth";
import { styled } from "@mui/material/styles";

import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../CustomIcons";
import { Link } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { login_type } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await login_type("Google");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await login_type("Facebook");
    } catch (err) {
      console.log(err);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card sx={{ boxShadow: "none", height: "38rem" }}>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "30px",
          color: "#294563",
          fontFamily: "Inter",
          fontWeight: "700",
          marginBottom: "25px",
        }}
        textAlign="center"
      >
        Đăng nhập để tiếp tục
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{
          textTransform: "none",
          border: "2px solid #E8E8E8",
          color: "var(--Gray-3, #828282)",
        }}
        onClick={() => handleGoogleSignIn()}
        startIcon={<GoogleIcon />}
      >
        Tiếp tục với Google
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{
          textTransform: "none",
          border: "2px solid #E8E8E8",
          color: "var(--Gray-3, #828282)",
          marginTop: "15px",
        }}
        onClick={() => handleFacebookSignIn()}
        startIcon={<FacebookIcon />}
      >
        Tiếp tục với Facebook
      </Button>
      <Box
        display="flex"
        mt={2}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Divider sx={{ width: "100%", borderStyle: "dashed" }} />
        <Typography
          variant="body1"
          sx={{
            padding: "0 16px",
            color: "#A1A1A1",
            whiteSpace: "nowrap",
            fontSize: "20px",
            fontFamily: "Nunito Sans",
            fontStyle: "normal",
            lineHeight: "normal",
          }}
        >
          hoặc đăng nhập với Email
        </Typography>
        <Divider sx={{ width: "100%", borderStyle: "dashed" }} />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel
            htmlFor="email"
            sx={{
              marginBottom: "20px",
              fontWeight: "700",
              fontSize: "19px",
              fontFamily: "Inter",
              color: "#294563",
            }}
          >
            Email
          </FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="Vui lòng điền email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel
              htmlFor="password"
              sx={{
                marginBottom: "20px",
                fontWeight: "700",
                fontSize: "19px",
                fontFamily: "Inter",
                color: "#294563",
              }}
            >
              Mật khẩu
            </FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="Vui lòng điền mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "10px",
            }}
          >
            <Link
              onClick={handleClickOpen}
              style={{
                alignSelf: "baseline",
                textDecoration: "none",
                color: "#7F265B",
              }}
            >
              Quên mật khẩu ?
            </Link>
          </div>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          sx={{ background: "#1EA26E" }}
        >
          Đăng nhập
        </Button>
        <Typography
          mt={2}
          sx={{ textAlign: "center", color: "var(--Gray-3, #828282)" }}
        >
          Chưa có tài khoản ?{" "}
          <span>
            <Link
              to="/register"
              style={{
                alignSelf: "center",
                color: "#7F265B",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              Tạo tạo khoản
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
