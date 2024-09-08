// src/components/ScoreBoard.js
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./Test.module.css";

export default function ScoreBoard() {
  const rows = [
    {
      id: 1,
      reading: 6.5,
      listening: 7,
      writing: 6.5,
      speaking: 7,
      overall: 7,
    },
  ];

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <TableContainer component={Paper} className={styles.scoreTableContainer}>
        <Typography
          variant="h6"
          align="center"
          className={styles.scoreBoardTitle}
        >
          DANH SÁCH BẢNG GHI ĐIỂM
        </Typography>
        <Typography
          variant="body2"
          align="center"
          className={styles.scoreBoardSubtitle}
        >
          Lưu dữ các bản ghi điểm các bài thi thử của bạn
        </Typography>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeaderRow}>
              <TableCell align="center" className={styles.tableHeaderCell}>
                NO.
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                READING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                LISTENING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                WRITING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                SPEAKING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                OVERALL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className={styles.tableBodyRow}>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.id}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.reading}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.listening}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.writing}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.speaking}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.overall}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
