import { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import styles from "./CustomerProfile.module.css";
import { validationSchema } from "./ValidationCustomerProfile";
import { UpdatePassword } from "../../../api/AuthenApi";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";

const CustomerProfile = () => {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    
    try {
      const response = await UpdatePassword(values.currentPassword, values.password);
      if (response.ok) {
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Có lỗi xảy ra khi cập nhật");
    }
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <div className="container">
          <div
            className={styles.profileBody}
            style={{ marginLeft: "20px", marginTop: "25px" }}
          >
            <div className={styles.profile}>
              <h1>Thông tin cá nhân</h1>
            </div>
            <div className={styles.profileBoxNIput}>
              <div className={styles.notify}>
                <label>Họ và tên</label>
              </div>
              <div className={styles.notify}>{user?.fullName}</div>
            </div>
            <div className={styles.profileBoxNIput}>
              <div className={styles.notify}>
                <label>Email</label>
              </div>
              <div className={styles.notify}>{user?.email}</div>
            </div>
            <div className={styles.profileBoxNIput}>
              <div className={styles.notify}>
                <label>Giới tính</label>
              </div>
              <div className={styles.notify}>
                {user?.gender == "male" ? "Nam" : "Nữ"}
              </div>
            </div>
            <div className={styles.profileBoxNIput}>
              <div className={styles.notify}>
                <label className={styles.label}>Số điện thoại</label>
              </div>
              <div className={styles.notify}>{user?.phoneNumber}</div>
            </div>
            <div className={styles.profileBoxNIput}>
              <div className={styles.notify}>
                <label>Mật khẩu hiện tại</label>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.passwordInputContainer}>
                <Field
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Nhập mật khẩu hiện tại"
                  className={styles.input}
                />
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  className={styles.passwordIcon}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              </div>
            </div>
            <div className={styles.profileBoxNIput}>
              <div className={styles.notify}>
                <label htmlFor="password">Mật khẩu mới</label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.passwordInputContainer}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  className={styles.input}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={styles.passwordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
          </div>

          <hr style={{ width: "40%", margin: "20px 0 20px 20px" }} />
          <button type="submit" className={styles.profileButton}>
            Cập nhật
          </button>
        </div>
      </FormikForm>
    </Formik>
  );
};

export default CustomerProfile;
