import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import styles from "./test.module.css";
import SignUpSide from "../../components/partial/Authen/SignUp/SignUp";
export default function ResgisterPage() {
  return (
    <div>
      <div className={styles.hiddenScroll}>
        <Navbar />
        <SignUpSide />
        <Footer />
      </div>
    </div>
  );
}
