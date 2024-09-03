import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import styles from "./test.module.css";
import ForgotPassword from "../../components/partial/Authen/ForgotPassword/ForgotPassword";
export default function ForgotPasswordPage() {
  return (
    <div>
      <div className={styles.hiddenScroll}>
        <Navbar />
        <ForgotPassword />
        <Footer />
      </div>
    </div>
  );
}
