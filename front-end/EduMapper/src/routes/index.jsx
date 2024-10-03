import { createBrowserRouter } from "react-router-dom";
import UserTestPage from "../pages/UserTest/UserTestPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Authen/LoginPage";
import ResgisterPage from "../pages/Authen/ResgisterPage";
import ForgotPasswordPage from "../pages/Authen/ForgotPasswordPage";
import PackagePage from "../pages/Package/PackagePage";
import CenterPage from "../pages/CenterPage/CenterPage";
import CenterDetailPage from "../pages/CenterPage/CenterDetailPage";
import CenterRatingPage from "../pages/CenterPage/CenterRatingPage";
import CreateCenterRating from "../components/partial/CenterRating/CreateCenterRating";
import TakeTestPage from "../pages/TakeTestPage/TakeTestPage";
import TakeTestPrePage from "../pages/TakeTestPage/TakeTestPrePage";
import CompleteProfile from "../components/partial/Authen/SignIn/CompleteProfile";
import ListeningTestPage from "../pages/UserTest/ListeningTestPage";
import GuestAuth from "../Guard/GuestAuth";
import WritingTestPage from "../pages/UserTest/WritingTestPage";
import RoleBasedGuard from "../Guard/RoleBaseGuard";
import UserProfilePage from "../pages/UserProfile/UserProfilePage";
import CustomerPage from "../pages/CustomerPage/CustomerPage";
import SendOtpPage from "../pages/Authen/SendOtpPage";
import MemberShipPage from "../pages/MemberShipPage/MemberShipPage";
import CustomerTransactionPage from "../pages/CustomerPage/CustomerTransactionPage";
import CoursePage from "../pages/Course/CoursePage";
import QuestionPage from "../pages/QuestionPage/QuestionPage";
import PassagePage from "../pages/PassagePage/PassagePage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Checkout from "../pages/PaymentPage/CheckOut";
import WaitingCheckout from "../pages/PaymentPage/WaitingCheckOut";
import ExamPage from "../pages/ExamPage/ExamPage";
import ChatPage from "../pages/ChatPage/ChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RoleBasedGuard accessibleRoles={["Customer", "Admin"]}>
        <HomePage />
      </RoleBasedGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestAuth>
        <LoginPage />
      </GuestAuth>
    ),
  },
  {
    path: "/register",
    element: <ResgisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/package",
    element: <PackagePage />,
  },
  {
    path: "/english-center",
    element: <CenterPage />,
  },
  {
    path: "/english-center-detail",
    element: <CenterDetailPage />,
  },
  {
    path: "/rating",
    element: <CenterRatingPage />,
  },
  {
    path: "/create-rating",
    element: <CreateCenterRating />,
  },
  {
    path: "/take-test",
    element: <TakeTestPage />,
  },
  {
    path: "/take-testPre",
    element: <TakeTestPrePage />,
  },
  {
    path: "/reading-test",
    element: <UserTestPage />,
  },
  {
    path: "/complete-profile",
    element: (
      <GuestAuth>
        <CompleteProfile />
      </GuestAuth>
    ),
  },
  {
    path: "/listening-test",
    element: <ListeningTestPage />,
  },
  {
    path: "/writing-test",
    element: <WritingTestPage />,
  },
  {
    path: "personal-profile",
    element: (
      // <RoleBasedGuard
      //   accessibleRoles={["Customer", "Admin", "Moderator"]}
      //   status="Active"
      // >
      <CustomerPage />
      // </RoleBasedGuard>
    ),
    //errorElement: <ErrorException />,
  },
  {
    path: "send-otp/:email",
    element: (
      <GuestAuth>
        <SendOtpPage />
      </GuestAuth>
    ),
  },
  {
    path: "/membership",
    element: <MemberShipPage />,
  },
  {
    path: "/customer-transaction",
    element: <CustomerTransactionPage />,
  },
  {
    path: "/course",
    element: <CoursePage />,
  },
  {
    path: "/question-management",
    element: <QuestionPage />,
  },
  {
    path: "/passage-management",
    element: <PassagePage />,
  },
  {
    path: "/user-profile",
    element: <UserProfilePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  { path: "/payment", element: <Checkout /> },
  {
    path: "/waiting-checkout",
    element: <WaitingCheckout />,
  },
  {
    path: "/exam-management",
    element: <ExamPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);
