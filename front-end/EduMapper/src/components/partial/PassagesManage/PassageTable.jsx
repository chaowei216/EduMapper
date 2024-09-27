import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandContent from "../../global/ExpandContent";

export default function PassageTable({
  data,
  handleClickUpdate,
  handleClickDelete,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  // Xử lý khi nhấn vào checkbox
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Xử lý khi nhấn nút thêm vào đề
  const handleAddToTest = () => {
    alert(`Các khóa học được chọn: ${selectedIds.join(", ")}`);
  };
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
  const TableHeader = ["Tên câu hỏi", "Loại", "Đáp án", "Hành động"];

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
                  align="left"
                  key={index}
                >
                  <span style={{ fontSize: "larger" }}>{row}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data && <NoDataPage />}
            {data && data.length === 0 && <NoDataPage />}
            {data &&
              data.map((row, index) => {
                return (
                  <StyledTableRow
                    style={{ textAlign: "center", height: "60px" }}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "250px", textAlign: "justify" }}
                      component="th"
                      scope="row"
                    >
                      {row.questionText}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", alignItems: "center" }}
                      align="left"
                    >
                      {row.questionType}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      {row.correctAnswer}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      <Button
                        variant="text"
                        sx={{ color: "black" }}
                        onClick={() => handleClickDelete(row)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Checkbox
                        key={index + 1}
                        checked={selectedIds.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{display: "flex", justifyContent: "end", marginTop: "20px"}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddToTest}
          sx={{ marginTop: "10px"}}
        >
          Thêm vào đề
        </Button>
      </div>
    </div>
  );
}
