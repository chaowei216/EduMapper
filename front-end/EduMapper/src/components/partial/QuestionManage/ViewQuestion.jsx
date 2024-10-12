import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import QuestionTable from "./QuestionTable";
import CreateQuestionModal from "./CreateQuestionModal";
import AddQuestionPassage from "./AddQuestionPassage";
import {
  GetAllQuestion,
  GetFreeQuestion,
} from "../../../api/QuestionManageApi";
export default function ViewQuestion() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [passageModal, setPassageModal] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [questionId, setQuestionId] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const getAllQuestion = async () => {
      const response = await GetAllQuestion(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.data;
        setData(data);
        setTotalPages(responseJson.metaData.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    const getFreeQuestion = async () => {
      const response = await GetFreeQuestion(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.data;
        setData(data);
        setTotalPages(responseJson.metaData.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    if (filter == "free-question") {
      getFreeQuestion();
    } else {
      getAllQuestion();
    }
  }, [page, totalPages, pageSize, isCreated, filter]);

  const handleClickUpdate = (data) => {
    setDataDetail(data);
    setOpenDetail(true);
  };
  const handleClickDelete = (data) => {
    setDataDetail(data);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
  };
  const handleChangeFilter = (data) => {
    setPage(1);
    setFilter(data);
  };
  return (
    <div
      style={{
        padding: "25px 25px 5px 25px",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <div
        style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Các câu hỏi
      </div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <Button
          variant="contained"
          style={{ fontWeight: "bold" }}
          onClick={() => setCentredModal(true)}
        >
          <Inventory2Icon />
          Tạo câu hỏi
        </Button>
        <div>
          <FormControl sx={{ width: "200px" }}>
            <Select
              displayEmpty
              defaultValue=""
              inputProps={{ "aria-label": "Without label" }}
              onChange={(e) => handleChangeFilter(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="free-question">Câu hỏi còn trống</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <QuestionTable
        data={data}
        handleClickUpdate={handleClickUpdate}
        handleClickDelete={handleClickDelete}
        setQuestionId={setQuestionId}
        setPassageModal={setPassageModal}
        filter={filter}
      />
      {data && data.length > 0 && (
        <>
          <div
            style={{
              position: "relative",
              minHeight: "80px",
            }}
          >
            <ul
              style={{
                marginTop: "28px",
                marginBottom: "10px",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <PageNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </ul>
            <ul style={{ float: "right", marginTop: "12px" }}>
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
            </ul>
          </div>
        </>
      )}
      <CreateQuestionModal
        centredModal={centredModal}
        setCentredModal={setCentredModal}
        setIsCreated={setIsCreated}
      />
      <UpdateModal
        centredModal={openDetail}
        setCentredModal={setOpenDetail}
        membershipData={dataDetail}
        setIsCreated={setIsCreated}
      />
      <DeleteModal
        show={openDelete}
        handleClose={handleClose}
        data={dataDetail}
        setIsCreated={setIsCreated}
      />
      <AddQuestionPassage
        passageModal={passageModal}
        setPassageModal={setPassageModal}
        setIsCreated={setIsCreated}
        questionId={questionId}
      />
    </div>
  );
}
