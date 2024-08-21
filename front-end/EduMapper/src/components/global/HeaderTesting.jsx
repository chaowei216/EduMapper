import { useState, useEffect } from 'react';
import styles from './HeaderTesting.module.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src="edu-mapper-logo.png" alt="Edu Mapper Logo" />
        </div>
        <Typography variant="h6" className={styles.timer}>
          {formatTime(timeRemaining)} remaining
        </Typography>
        <div className={styles.actions}>
          <Button variant="contained" color="error" className={styles.exitTest}>
            Exit Test
          </Button>
          <Button variant="contained" color="success" className={styles.submit}>
            Submit
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTesting;