import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import CheckIcon from "@mui/icons-material/Check";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <section>
      <MDBContainer className="pt-3">
        <MDBRow>
          <Typography mb={4} textAlign={"center"} variant="h3" gutterBottom>
            Trang cá nhân
          </Typography>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="/img/logoEdu.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "180px", margin: "0 auto" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  <b>Vai trò:</b> {user?.roleName || "Không có dữ liệu"}
                </p>
                <p className="text-muted mb-4">
                  <b>Họ và tên:</b> {user?.fullName || "Không có dữ liệu"}
                </p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBIcon style={{marginLeft: "10px"}} fas icon="check fa-lg" />
                    <MDBCardText>
                      {user?.isVerified == true
                        ? "Đã xác thực email"
                        : user?.roleName == "Admin"
                        ? "Đã xác thực"
                        : "Chưa xác thực email"}
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.fullName || "Admin"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.email || "Edumapper@admin.com"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.phoneNumber || "Không có"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.gender || "Không có"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.address || "Không có"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow>
              <MDBCol>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Phần khác
                      </span>
                    </MDBCardText>
                    <hr className="my-4" />
                    <div className="d-flex justify-between align-items-center">
                      <p className="mb-0 text-uppercase">
                        <i className="fas fa-cog me-2"></i>{" "}
                        <span className="text-muted small">Gia Sư Học Tâp</span>
                      </p>
                      <p className="mb-0 text-uppercase">
                        <MailOutlineIcon />
                        <span className="text-muted small">
                          Email: contact@giasuhoctap.com
                        </span>
                        <span className="ms-3 me-4">
                          |{" "}
                          <span className="ml-3 text-muted small">
                            {"Admin"}
                          </span>
                        </span>
                      </p>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
