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
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import ExpandableText from "../../../utils/ExpandableText";
export default function QuestionTable({
  data,
  handleClickUpdate,
  handleClickDelete,
  setQuestionId,
  setPassageModal,
  filter,
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
    const questionIdsAsStrings = selectedIds.map((id) => id.toString());
    setQuestionId(questionIdsAsStrings);
    setPassageModal(true);
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
  const TableHeader = [
    "ID câu hỏi",
    "Tên câu hỏi",
    "Loại",
    "Đáp án",
    "Hành động",
  ];

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
            {data && (data.length == 0 || data.length == undefined) && (
              <NoDataPage />
            )}
            {data &&
              data.length > 0 &&
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
                        width: "350px",
                        textAlign: "center",
                      }}
                      component="th"
                      scope="row"
                    >
                      {row.questionId}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", alignItems: "center" }}
                      align="justify"
                    >
                      <ExpandableText text={row.questionText} />
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", alignItems: "center" }}
                      align="center"
                    >
                      {row.questionType}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="center">
                      {row.correctAnswer}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="center">
                      {filter != "" ? (
                        <>
                          <Button
                            variant="text"
                            sx={{ color: "black" }}
                            onClick={() => handleClickDelete(row)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Checkbox
                            key={index + 1}
                            checked={selectedIds.includes(row.questionId)}
                            onChange={() =>
                              handleCheckboxChange(row.questionId)
                            }
                          />
                        </>
                      ) : <><DoNotTouchIcon/></>}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddToTest}
          sx={{ marginTop: "10px" }}
        >
          Thêm vào đề
        </Button>
      </div>
    </div>
  );
}
