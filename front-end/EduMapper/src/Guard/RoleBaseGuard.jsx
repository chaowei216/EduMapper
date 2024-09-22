import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import WaitingModal from "../components/global/WaitingModal";
import { Logout } from "../api/AuthenApi";

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node,
  status: PropTypes.string,
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user } = useAuth();
  const role = user?.roleName;
  return role || "Null";
};

// const useCurrentStatus = () => {
//    Logic here to get current user role
//   const { user } = useAuth();
//   const status = user?.status;
//   return status || "Pending";
// };

export default function RoleBasedGuard({
  accessibleRoles,
  children,
  status = "Active",
}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  const handleClick2 = () => {
    navigate("/dashboard");
  };

  //   useEffect(() => {
  //     const checking = async () => {
  //       if (user?.status === "InActive") {
  //         if (
  //           await confirm(
  //             "Bạn đã bị phụ huynh tố cáo quá nhiều nên chúng tôi quyết định cấm tài khoản bạn"
  //           )
  //         ) {
  //           const refreshToken = localStorage.getItem("refreshToken");
  //           const response = await Logout(refreshToken);
  //           if (response.ok) {
  //             await logout();
  //             navigate("/login");
  //           } else {
  //             await logout();
  //             navigate("/login");
  //           }
  //         }
  //       }
  //     };
  //     checking();
  //   }, [logout, navigate, user?.status]);

  const currentRole = useCurrentRole();
  //const currentStatus = useCurrentStatus();

  if (loading) {
    return (
      <div
        style={{
          background: "#f1f5f9",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WaitingModal open={loading} />
      </div>
    );
  }

  if (currentRole == "Null") {
    return <HomePage />;
  }

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <div
        style={{
          background: "#f1f5f9",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert style={{ fontSize: "20px" }} severity="error">
          <AlertTitle style={{ fontSize: "20px" }}>
            Quyền truy cập bị từ chối
          </AlertTitle>
          Bạn không có quyền để truy cập địa chỉ này
          <AlertTitle style={{ fontSize: "20px", marginTop: "15px" }}>
            {currentRole == "Admin" && (
              <Button onClick={handleClick2}>Trở về trang Admin</Button>
            )}
            {currentRole == "Customer" && (
              <Button onClick={handleClick}>Trở về trang chủ</Button>
            )}
          </AlertTitle>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
