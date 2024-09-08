// src/components/TestCard.js
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CircularProgress,
} from "@mui/material";
import { MenuBook, Create, Mic } from "@mui/icons-material"; // Import icons từ MUI
import HeadphonesIcon from "@mui/icons-material/Headphones";
import styles from "./TakeTest.module.css"; // Import CSS Module
export default function TestCard() {
  return (
    <Grid container spacing={2} justifyContent="center">
      {/* Listening */}
      <Grid item xs={6} sm={3}>
        <Card className={styles.testCard}>
          <HeadphonesIcon className={styles.icon} />
          <Typography variant="h6">Listening</Typography>
          <div className={styles.progressContainer}>
            <CircularProgress variant="determinate" value={50} size={60} />
            <Typography className={styles.progressText}>0%</Typography>
          </div>
          <Button
            variant="contained"
            style={{ background: "#73fbfd" }}
            className={styles.testButton}
          >
            Take Test
          </Button>
        </Card>
      </Grid>

      {/* Reading */}
      <Grid item xs={6} sm={3}>
        <Card className={styles.testCard}>
          <MenuBook className={styles.icon2} />
          <Typography variant="h6">Reading</Typography>
          <div className={styles.progressContainer}>
            <CircularProgress variant="determinate" value={50} size={60} />
            <Typography className={styles.progressText}>0%</Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            style={{ background: "#73fd91" }}
            className={styles.testButton}
          >
            Take Test
          </Button>
        </Card>
      </Grid>

      {/* Writing */}
      <Grid item xs={6} sm={3}>
        <Card className={styles.testCard}>
          <Create className={styles.icon3} />
          <Typography variant="h6">Writing</Typography>
          <div className={styles.progressContainer}>
            <CircularProgress variant="determinate" value={50} size={60} />
            <Typography className={styles.progressText}>0%</Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            style={{ background: "#f29d38" }}
            className={styles.testButton}
          >
            Take Test
          </Button>
        </Card>
      </Grid>

      {/* Speaking */}
      <Grid item xs={6} sm={3}>
        <Card className={styles.testCard}>
          <Mic className={styles.icon4} />
          <Typography variant="h6">Speaking</Typography>
          <div className={styles.progressContainer}>
            <CircularProgress variant="determinate" value={50} size={60} />
            <Typography className={styles.progressText}>0%</Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            style={{ background: "#ea3ef7" }}
            className={styles.testButton}
          >
            Take Test
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}
