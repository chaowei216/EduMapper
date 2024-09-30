import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import { DeleteMemberShip } from "../../../api/MemberShipApi";
import { toast } from "react-toastify";
import Messages from "../../../utils/Message";
import StatusCode from "../../../utils/StautsCode";
export default function DeleteExam(pros) {
  const { show, handleClose, data, setIsCreated } = pros;
  const handleDeny = async () => {
    if (data) {
      const response = await DeleteMemberShip(data.memberShipId);
      console.log(response);
      if (response.status == StatusCode.DELETE) {
        setIsCreated((prevIsCreated) => !prevIsCreated);
        toast.success(Messages.SUCCESS.DELETE);
        handleClose();
      } else {
        toast.error(Messages.ERROR.BAD_REQUEST);
      }
    }
  };

  return (
    <>
      <MDBModal open={show} tabIndex="-1" onClose={handleClose}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader
              className="modal-header d-flex "
              style={{ background: "white" }}
            >
              <MDBModalTitle
                className="text-xl"
                style={{ textAlign: "left", color: "#3295cf" }}
              >
                <WarningIcon
                  color="primary"
                  fontSize="large"
                  sx={{ marginRight: "10px" }}
                />{" "}
                Xóa gói thành viên này ?
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="form-content">
                <div style={{ fontSize: "large", color: "#a1a1a1" }}>
                  Bạn có chắc muốn xóa gói này không
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div>
                  <Button
                    variant="primary"
                    onClick={handleClose}
                    active
                    class="btn"
                    style={{
                      width: "100px",
                      marginRight: "20px",
                      background: "#ffffff",
                      color: "#a3a3a3",
                      border: "1px solid #dfdfdf",
                    }}
                  >
                    Đóng
                  </Button>
                </div>
                <div>
                  <Button
                    color="error"
                    variant="primary"
                    class="btn btn-outline-danger"
                    type="submit"
                    style={{
                      background: "#f74747",
                      width: "100px",
                      color: "white",
                    }}
                    onClick={handleDeny}
                    data-mdb-dismiss="modal"
                    active
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
