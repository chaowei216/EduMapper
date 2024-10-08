import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DeleteExam from "./DeleteExam";
import { GetAllExam } from "../../../api/ExamApi";
import TestTable from "./TestTable";
import CreateTest from "./CreateTest";
export default function ViewTest() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    const getAllMemberShip = async () => {
      const response = await GetAllExam(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.data;
        setData(data);
        
        // setTotalPages(responseJson.data.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    getAllMemberShip();
  }, [page, totalPages, pageSize, isCreated]);

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
        Các đề hiện có
      </div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <Button
          variant="contained"
          style={{ fontWeight: "bold" }}
          onClick={() => setCentredModal(true)}
        >
          <Inventory2Icon />
          Tạo đề
        </Button>
      </div>
      <TestTable
        data={data}
        handleClickUpdate={handleClickUpdate}
        handleClickDelete={handleClickDelete}
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
      <CreateTest
        centredModal={centredModal}
        setCentredModal={setCentredModal}
        setIsCreated={setIsCreated}
      />
      <DeleteExam
        show={openDelete}
        handleClose={handleClose}
        data={dataDetail}
        setIsCreated={setIsCreated}
      />
    </div>
  );
}
