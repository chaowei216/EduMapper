import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Nhập mật khẩu hiện tại"),
  password: Yup.string()
    .required("* Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)"
    ),
});
