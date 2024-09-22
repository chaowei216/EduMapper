import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleIcon, SitemarkIcon, FacebookIcon } from "../CustomIcons";
import useAuth from "../../../../hooks/useAuth";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../configs/firebase";
import { GetUserByEmail } from "../../../../api/AuthenApi";

// Styled Card component
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
}));

// Schema validation với Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("Bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Bắt buộc"),
  gender: Yup.string().required("Bắt buộc"),
  dateOfBirth: Yup.date().required("Bắt buộc"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Bắt buộc"),
});

export default function SignUpCard() {
  const { register, login_type } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const userRegister = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      phoneNumber: values.phoneNumber,
    };
    await register(userRegister);
  };
  // Sử dụng Formik để quản lý form và validation
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = {
        fullName: res.user.displayName,
        email: res.user.email,
        avatar: res.user.photoURL,
      };
      //xu ly logic login sau khi dang nhap lan sau

      const response = await GetUserByEmail(user.email);
      if (response.status != 404) {
        const userLogin = {
          fullName: "string",
          email: res.user.email,
          gender: "string",
          dateOfBirth: "2024-09-16T13:15:07.087Z",
          phoneNumber: "string",
          imageLink: "string",
        };
        await login_type("Google", userLogin);
      } else {
        navigate("/complete-profile", { state: { type: "Google", user } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = {
        fullName: res.user.displayName,
        email: res.user.email,
        avatar: res.user.photoURL,
      };

      const response = await GetUserByEmail(user.email);
      if (response.status != 404) {
        const userLogin = {
          fullName: "string",
          email: res.user.email,
          gender: "string",
          dateOfBirth: "2024-09-16T13:15:07.087Z",
          phoneNumber: "string",
          imageLink: "string",
        };
        await login_type("Google", userLogin);
      } else {
        navigate("/complete-profile", { type: "Facebook", state: { user } });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        textAlign="center"
        sx={{ color: "#000", textTransform: "uppercase", fontSize: "42px" }}
      >
        Edumapper
      </Typography>
      <Typography
        component="h1"
        variant="h3"
        textAlign="center"
        sx={{ color: "#000", fontSize: "20px" }}
      >
        Chào mừng tới cộng đồng EduMapper
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Full Name */}
        <FormControl>
          <FormLabel htmlFor="fullName">Họ và tên</FormLabel>
          <TextField
            id="fullName"
            name="fullName"
            placeholder="Vui lòng điền họ và tên"
            fullWidth
            variant="outlined"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.fullName && formik.errors.fullName
                ? formik.errors.fullName
                : ""
            }
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          />
        </FormControl>

        {/* Email */}
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="Vui lòng điền email"
            fullWidth
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
        </FormControl>

        {/* Phone Number */}
        <FormControl>
          <FormLabel htmlFor="phoneNumber">Số điện thoại</FormLabel>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Vui lòng điền số điện thoại"
            fullWidth
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : ""
            }
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
          />
        </FormControl>

        {/* Password */}
        <FormControl>
          <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="Vui lòng điền mật khẩu"
            fullWidth
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
        </FormControl>

        {/* Confirm Password */}
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Xác nhận mật khẩu</FormLabel>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            fullWidth
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          />
        </FormControl>

        {/* Date of Birth */}
        <FormControl>
          <FormLabel htmlFor="dateOfBirth">Ngày sinh</FormLabel>
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? formik.errors.dateOfBirth
                : ""
            }
            error={
              formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
            }
          />
        </FormControl>

        {/* Gender */}
        <FormControl>
          <FormLabel>Giới tính</FormLabel>
          <RadioGroup
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
          </RadioGroup>
          {formik.touched.gender && formik.errors.gender ? (
            <Typography color="error">{formik.errors.gender}</Typography>
          ) : null}
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ background: "#000" }}
        >
          Đăng ký
        </Button>

        <Divider
          style={{ background: "#000", height: "1px", margin: "10px 0" }}
        />

        <Button
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            border: "2px solid #E8E8E8",
            color: "#000",
          }}
          onClick={() => handleGoogleSignIn()}
          startIcon={<GoogleIcon />}
        >
          Đăng nhập với Google
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            border: "2px solid #E8E8E8",
            color: "#000",
          }}
          onClick={() => handleFacebookSignIn()}
          startIcon={<FacebookIcon />}
        >
          Tiếp tục với Facebook
        </Button>
        <Typography mt={2} sx={{ textAlign: "center", color: "#828282" }}>
          Có tài khoản rồi?{" "}
          <span>
            <Link
              to="/login"
              style={{
                color: "#7F265B",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              Đăng nhập
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
