import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function TestTable({
  data,
  handleClickUpdate,
  handleClickDelete,
}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const TableHeader = ["ID đề thi", "Tên đề", "Số câu hỏi", "Hành động"];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead style={{ backgroundColor: "#000000" }}>
            <TableRow>
              {TableHeader.map((row, index) => (
                <TableCell
                  style={{
                    color: "white",
                    alignItems: "center",
                    height: "50px",
                  }}
                  sx={{
                    "&:last-child th": {
                      textAlign: "center",
                    },
                  }}
                  align="center"
                  key={index}
                >
                  <span style={{ fontSize: "larger" }}>{row}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data && <NoDataPage />}
            {data && (data.length == 0 || data.length == undefined) && <NoDataPage />}
            {data && data.length > 0 &&
              data.map((row, index) => {
                return (
                  <StyledTableRow
                    style={{ textAlign: "center", height: "60px" }}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      style={{
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                      component="th"
                      scope="row"
                    >
                      {row.examId}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", alignItems: "center" }}
                      align="center"
                    >
                      {row.examName}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="center">
                      {row.numOfQuestions}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="center">
                      <Button
                        variant="text"
                        sx={{ color: "black" }}
                        onClick={() => handleClickDelete(row)}
                      >
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
