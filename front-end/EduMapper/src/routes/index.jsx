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
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import TestManagePage from "../pages/TestManagePage/TestManagePage";
import TestListPage from "../pages/TakeTestPage/TestListPage";
import TestResult from "../components/partial/UserTesting/TestResult";
import TestResultPage from "../pages/TestResult/TestResultPage";
import RequireAuth from "../Guard/RequireAuth";
import ErrorException from "../components/global/ErrorException";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RoleBasedGuard accessibleRoles={["Customer", "Admin"]}>
        <HomePage />
      </RoleBasedGuard>
    ),
    errorElement: <ErrorException/>
  },
  {
    path: "/login",
    element: (
      <GuestAuth>
        <LoginPage />
      </GuestAuth>
    ),
    errorElement: <ErrorException/>
  },
  {
    path: "/register",
    element: <ResgisterPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/package",
    element: <RequireAuth><PackagePage /></RequireAuth> ,
    errorElement: <ErrorException/>
  },
  {
    path: "/english-center",
    element: <CenterPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/english-center-detail",
    element: <CenterDetailPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/rating",
    element: <CenterRatingPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/create-rating",
    element: <CreateCenterRating />,
    errorElement: <ErrorException/>
  },
  {
    path: "/take-test/:testId",
    element: <TakeTestPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/take-testPre/:testId",
    element: <TakeTestPrePage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/reading-test/:testId",
    element: <RequireAuth> <UserTestPage /> </RequireAuth>,
    errorElement: <ErrorException/>
  },
  {
    path: "/complete-profile",
    element: (
      <GuestAuth>
        <CompleteProfile />
      </GuestAuth>
    ),
    errorElement: <ErrorException/>
  },
  {
    path: "/listening-test/:testId",
    element: <RequireAuth> <ListeningTestPage /> </RequireAuth>,
    errorElement: <ErrorException/>
  },
  {
    path: "/writing-test/:testId",
    element: <RequireAuth><WritingTestPage /></RequireAuth> ,
    errorElement: <ErrorException/>
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
    errorElement: <ErrorException />,
  },
  {
    path: "send-otp/:email",
    element: (
      <GuestAuth>
        <SendOtpPage />
      </GuestAuth>
    ),
    errorElement: <ErrorException/>
  },
  {
    path: "/membership",
    element: <RoleBasedGuard accessibleRoles={["Admin", "Customer"]}> <MemberShipPage /> </RoleBasedGuard>,
    errorElement: <ErrorException/>
  },
  {
    path: "/customer-transaction",
    element: <CustomerTransactionPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/course",
    element: <CoursePage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/question-management",
    element: <QuestionPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/passage-management",
    element: <PassagePage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/user-profile",
    element: <UserProfilePage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <ErrorException/>
  },
  { path: "/payment", element: <Checkout />, errorElement: <ErrorException/>  },
  {
    path: "/waiting-checkout",
    element: <WaitingCheckout />,
    errorElement: <ErrorException/>
  },
  {
    path: "/exam-management",
    element: <ExamPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/chat",
    element: <RequireAuth><ChatPage /></RequireAuth>,
    errorElement: <ErrorException/>
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/test-management",
    element: <TestManagePage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/list-test",
    element: <TestListPage />,
    errorElement: <ErrorException/>
  },
  {
    path: "/test-result/:examId",
    element: <TestResultPage />,
    errorElement: <ErrorException/>
  },
]);
