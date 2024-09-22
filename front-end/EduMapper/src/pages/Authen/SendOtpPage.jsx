import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import styles from "./test.module.css";
import SendOTPSide from "../../components/partial/Authen/SendOTP/SendOTPSide";
const SendOtpPage = () => {
  return (
    <div className={styles.hiddenScroll}>
      <Navbar />
      <SendOTPSide />
      <Footer />
    </div>
  );
};

export default SendOtpPage;
