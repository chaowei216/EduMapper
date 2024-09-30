import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import useAuth from "../../../hooks/useAuth";
import GroupIcon from "@mui/icons-material/Group";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReportIcon from "@mui/icons-material/Report";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ArticleIcon from "@mui/icons-material/Article";
export default function Sidebar() {
  const { user } = useAuth();
  const Menus = [
    {
      title: "Trang cá nhân",
      path: "/user-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/user-profile",
    },
    {
      title: "MemberShip",
      path: "/membership",
      icon: <CardMembershipIcon />,
      id: 99,
      src: "/membership",
    },
    {
      title: "Tạo đề thi",
      path: "/exam-management",
      icon: <ArticleIcon />,
      id: 91,
      src: "/exam-management",
    },
    {
      title: "Tạo đoạn văn",
      path: "/passage-management",
      icon: <AutoStoriesIcon />,
      id: 96,
      src: "/passage-management",
    },
    {
      title: "Tạo câu hỏi",
      path: "/question-management",
      icon: <QuestionAnswerIcon />,
      id: 98,
      src: "/question-management",
    },
  ];
  if (user?.roleName === "Moderator") {
    Menus.push(
      {
        title: "Thông báo",
        path: "/view-notification",
        icon: <CircleNotificationsIcon />,
        id: 32,
        src: "/view-notification",
      },
      {
        title: "Đánh giá",
        path: "/view-feedback",
        icon: <FeedbackIcon />,
        id: 42,
        src: "/view-feedback",
      },
      {
        title: "Báo cáo",
        path: "/view-report",
        icon: <ReportIcon />,
        id: 52,
        src: "/view-report",
      },
      {
        title: "Tin tức",
        path: "/view-new-moderator",
        icon: <NewspaperIcon />,
        id: 53,
        src: "/view-new-moderator",
      }
    );
  }
  if (user?.roleName === "Admin") {
    Menus.push(
      {
        title: "Thống kê",
        path: "/dashboard",
        icon: <HomeIcon />,
        id: 12,
        src: "/dashboard",
      },
      {
        title: "Quản lý tài khoản",
        path: "/user-management",
        icon: <GroupIcon />,
        id: 13,
        src: "/user-management",
      },
      {
        title: "Duyệt gia sư",
        path: "/tutor",
        icon: <WorkHistoryIcon />,
        id: 2,
        src: "/tutor",
      },
      {
        title: "Giao dịch",
        path: "/transaction",
        icon: <ArticleIcon />,
        id: 4,
        src: "/transaction",
      }
    );
  }
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/dashboard");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.header_container}>
          <img src="/img/logoEdu.png" alt="avatar logo" width={75} />
          <div className={styles.header_sidebar}>Edummaper</div>
        </div>
        <hr style={{ border: "1px solid white" }} />
        <ul className={styles["sidebar-nav"]}>
          {Menus.map((menu) => (
            <li key={menu.id} className={styles["sidebar-nav-item"]}>
              <NavLink
                exact
                to={menu.path}
                className={`${styles["sidebar-nav-link"]} ${
                  currentPath === menu.path && styles.active
                }`}
              >
                <p>
                  {menu.icon} {menu.title}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
