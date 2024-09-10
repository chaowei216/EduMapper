import { useState, useEffect } from "react";
import styles from "./HeaderTesting.module.css";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const HeaderTesting = () => {
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img
          src="/img/logoEdu.png"
          alt="Edu Mapper Logo"
        />
      </div>
      <div className={styles.timer}>{formatTime(timeRemaining)} minutes remaining</div>
      <div className={styles.actions}>
        <Button variant="contained" color="error" className={styles.exitTest}>
          Exit Test
        </Button>
        <Button variant="contained" color="success" className={styles.submit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default HeaderTesting;
