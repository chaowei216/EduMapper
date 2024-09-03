import SignInSide from "../../components/partial/Authen/SignIn/SignIn";
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import styles from "./test.module.css";
export default function LoginPage() {
  return (
    <div>
      <div className={styles.hiddenScroll}>
        <Navbar />
        <SignInSide />
        <Footer />
      </div>
    </div>
  );
}
