import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PassageTable from "./PassageTable";
import { GetAllPassage } from "../../../api/PassageApi";
import CreatePassageModal from "./CreatePassageModal";
import UpdateModal from "../MembershipManagement/UpdateModal";
import DeleteModal from "../MembershipManagement/DeleteModal";
import CreatePassage2 from "./CreatePassage2";
export default function ViewPassage() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreatePassage2, setOpenCreatePassage2] = useState(false);
  useEffect(() => {
    const getAllPassage = async () => {
      const response = await GetAllPassage(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData;
        setData(data);
        // setTotalPages(responseJson.data.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    getAllPassage();
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
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
        Các đoạn văn
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          id="basic-button"
          variant="contained"
          style={{ fontWeight: "bold" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Inventory2Icon />
          Tạo đoạn văn
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setCentredModal(true);
              setAnchorEl(null);
            }}
          >
            Tạo đoạn văn ielts
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setOpenCreatePassage2(true);
              setAnchorEl(null);
            }}
          >
            Tạo đoạn văn khác
          </MenuItem>
        </Menu>
      </div>
      <PassageTable
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
      <CreatePassageModal
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
      <CreatePassage2
        centredModal={openCreatePassage2}
        setCentredModal={setOpenCreatePassage2}
        setIsCreated={setIsCreated}
      />
    </div>
  );
}
