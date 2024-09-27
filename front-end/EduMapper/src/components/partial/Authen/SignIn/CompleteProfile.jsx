import {
  Button,
  TextField,
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../../hooks/useAuth";
import { useEffect } from "react";

// Define validation schema using Yup
const validationSchema = Yup.object({
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  address: Yup.string()
    .min(5, "Địa chỉ có ít nhất 5 ký tự")
    .max(70, "Địa chỉ nhiều nhất là 70 ký tự")
    .required("Vui lòng nhập địa chỉ"),
  phoneNumber: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Số điện thoại ít nhất 10 số")
    .max(11, "Số điện thoại nhiều nhất 10 số")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/,
      "Vui lòng nhập số không nhập ký tự"
    ),
});

export default function CompleteProfile() {
  const { login_type } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const navigate = useNavigate();

  const { state } = location;
  const initialUser = state?.user || {};

  // Initialize the form values with user data
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      address: "",
      gender: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
    validationSchema: validationSchema,
  });

  // Handle form submission
  const submitForm = async (values) => {
    // Combine user data with additional values
    const updatedUser = { ...initialUser, ...values };
    // Navigate to another page if needed
    await login_type(state?.type, updatedUser);
  };
  useEffect(() => {
    if (state?.user == null) {
      navigate("/login");
    }
  }, [state?.user, navigate]);
  return (
    <div style={{height: "100vh", display: "flex", background: "aliceblue", alignItems: "center"}}>
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 9,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ marginBottom: 2 }}>
          Hoàn tất hồ sơ của bạn
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl
                fullWidth
                error={formik.touched.gender && !!formik.errors.gender}
              >
                <InputLabel id="gender-label">Giới tính</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  label="Giới tính"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gender && !!formik.errors.gender}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
                {formik.touched.gender && !!formik.errors.gender && (
                  <FormHelperText>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                }}
                label="Địa chỉ"
                name="address"
                autoComplete="address"
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                }}
                label="Số điện thoại"
                name="phoneNumber"
                autoComplete="phoneNumber"
                error={
                  formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Cập nhật hồ sơ
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
  );
}
