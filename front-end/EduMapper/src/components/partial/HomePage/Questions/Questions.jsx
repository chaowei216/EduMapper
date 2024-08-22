import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGift,
  faBoxOpen,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Questions.module.css";

const Questions = () => {
  const [statisticData, setStatisticData] = useState({
    totalTutor: 10,
    totalStudent: 20,
    successfulLessons: 30,
    satisfiedParents: 40,
  });

  // Render các thành phần UI với dữ liệu từ state
  return (
    <div className={styles.questionsWrapper}>
      <div style={{ display: "flex" }}>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faClock} className={styles.icon} />
          <p>Gia Sư Toàn Quốc</p>
          <p style={{ color: "#23B527", fontWeight: "500", fontSize: "30px" }}>
            {statisticData.totalTutor}
          </p>
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faGift} className={styles.icon} />
          <p>Học Viên</p>
          <p style={{ color: "#23B527", fontWeight: "500", fontSize: "30px" }}>
            {statisticData.totalStudent}
          </p>
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
          <p>Buổi Học Thành Công</p>
          <p style={{ color: "#23B527", fontWeight: "500", fontSize: "30px" }}>
            {statisticData.successfulLessons}
          </p>
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faRotate} className={styles.icon} />
          <p>Phụ Huynh Rất Hài Lòng</p>
          <p style={{ color: "#23B527", fontWeight: "500", fontSize: "30px" }}>
            {statisticData.satisfiedParents}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
