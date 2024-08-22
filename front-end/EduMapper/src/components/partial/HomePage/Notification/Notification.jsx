import { useState, useEffect } from "react";
import { Badge, Stack, Popover, Typography, Box } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Notification.module.css";

// Dữ liệu thông báo mẫu
const mockNotifications = [
  {
    notificationId: 1,
    notificationType: "Info",
    description: "Đây là thông báo thông tin.",
    createdTime: new Date().toISOString(),
  },
  {
    notificationId: 2,
    notificationType: "Warning",
    description: "Cảnh báo quan trọng!",
    createdTime: new Date(Date.now() - 3600000).toISOString(), // 1 giờ trước
  },
  {
    notificationId: 3,
    notificationType: "Error",
    description: "Đã xảy ra lỗi.",
    createdTime: new Date(Date.now() - 7200000).toISOString(), // 2 giờ trước
  },
  {
    notificationId: 4,
    notificationType: "System",
    description: "Thông báo hệ thống.",
    createdTime: new Date(Date.now() - 10800000).toISOString(), // 3 giờ trước
  },
];

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Sử dụng dữ liệu thông báo mẫu
    const fetchNotifications = () => {
      const sortedNotifications = [...mockNotifications].sort(
        (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
      );
      setNotifications(sortedNotifications);

      // Cập nhật số lượng thông báo chưa đọc từ localStorage
      const storedViewedNotifications = JSON.parse(
        localStorage.getItem("viewedNotifications") || "[]"
      );
      const unreadCount = sortedNotifications.filter(
        (notification) =>
          !storedViewedNotifications.includes(notification.notificationId)
      ).length;
      setUnreadCount(unreadCount);
    };

    fetchNotifications();

    // Thiết lập một interval để kiểm tra thông báo mới mỗi phút
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 10000); // 10000ms = 10 giây

    return () => clearInterval(intervalId); // Clear interval khi component bị unmount
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    // Lưu các thông báo đã xem vào localStorage
    const viewedNotifications = notifications.map(
      (notification) => notification.notificationId
    );
    localStorage.setItem(
      "viewedNotifications",
      JSON.stringify(viewedNotifications)
    );

    // Đặt số thông báo về 0 khi click vào biểu tượng
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getIcon = (type) => {
    switch (type) {
      case "System":
        return faCircleInfo; // Icon cho System
      case "Info":
        return faCircleCheck; // Icon cho Info
      case "Warning":
        return faTriangleExclamation; // Icon cho Warning
      case "Error":
        return faCircleXmark; // Icon cho Error
      default:
        return null;
    }
  };

  const getClassName = (type) => {
    switch (type) {
      case "System":
        return `${styles.info}`; // Class cho System
      case "Info":
        return `${styles.check} ${styles.shine2}`; // Class cho Info
      case "Warning":
        return `${styles.warning}`; // Class cho Warning
      case "Error":
        return `${styles.danger} ${styles.shine}`; // Class cho Error
      default:
        return "";
    }
  };

  const getNofitycationContent = (type) => {
    switch (type) {
      case "System":
        return "#4DA8DA"; // Màu xanh cho System
      case "Info":
        return "#008000"; // Màu xanh lá cho Info
      case "Warning":
        return "#ffc107"; // Màu vàng cho Warning
      case "Error":
        return "#f44336"; // Màu đỏ cho Error
      default:
        return "#000000";
    }
  };

  return (
    <>
      <Stack sx={{ marginRight: "20px" }} spacing={2} direction="row">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsNoneOutlinedIcon onClick={handleClick} color="white" />
        </Badge>
      </Stack>
      <Popover
        id="popover-basic"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ marginTop: "10px" }}
      >
        <Box sx={{ p: 2, maxHeight: "300px", overflowY: "auto" }}>
          {notifications.map((notification, index) => (
            <Typography
              key={notification.notificationId}
              sx={{
                width: "350px",
                borderBottom: "1px solid #4dccda",
                marginBottom: "8px",
                display: "flex",
                alignItems: "flex-start",
                ...(index >= 100 && { display: "none" }), // Ẩn các thông báo vượt quá 100
              }}
            >
              <div
                style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  icon={getIcon(notification.notificationType)}
                  style={{ marginRight: "20px", fontSize: "18px" }}
                  className={getClassName(notification.notificationType)}
                />
                <div>
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "4px",
                      color: getNofitycationContent(
                        notification.notificationType
                      ),
                    }}
                  >
                    {notification.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(notification.createdTime).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
