// src/App.js
import TestCard from "./TestCard";
import ScoreBoard from "./ScoreBoard";
import styles from "./Test.module.css";
import { Typography, Button, Grid, Divider } from "@mui/material";

export default function ViewTakeTestPre() {
  return (
    <div className={styles.container}>
      {/* Top Section with Image and Text */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        className={styles.topSection}
      >
        <Grid item xs={12} md={3}>
          <img
            src="/img/test-pre.png" // Update the image path
            alt="Illustration"
            className={styles.topImage}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" className={styles.premiumTitle}>
            Premium plus test
          </Typography>
          <Typography variant="body1" className={styles.premiumDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {/* Testing Section */}
      <Typography mt={4} variant="h5" className={styles.testingTitle}>
        TESTING
      </Typography>
      <div>
        <TestCard />
      </div>

      {/* Scoreboard Table */}
      <ScoreBoard />

      {/* Refresh Button */}
      <div className={styles.refreshButton}>
        <Button variant="contained" color="secondary">
          Làm mới
        </Button>
      </div>
    </div>
  );
}
