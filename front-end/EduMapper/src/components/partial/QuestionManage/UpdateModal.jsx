import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UpdateMemberShip } from "../../../api/MemberShipApi";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import { toast } from "react-toastify";

// Schema validation với Yup
const validationSchema = Yup.object().shape({
  membershipName: Yup.string().required("Tên membership là bắt buộc"),
  features: Yup.array()
    .of(Yup.string().required("Mỗi feature phải là một chuỗi"))
    .required("Cần ít nhất một feature"),
  noFeatures: Yup.array().of(Yup.string().required("Không thể để trống")),
  price: Yup.number().required("Giá là bắt buộc").min(0, "Giá phải lớn hơn 0"),
});

export default function UpdateModal(prop) {
  const { centredModal, setCentredModal, membershipData, setIsCreated } = prop; // Nhận dữ liệu membership từ props
  // Hàm xử lý lưu form
  const handleSave = async (values) => {
    if (membershipData) {
      const dataInput = {
        memberShipName: values.membershipName,
        features: values.features,
        noFeatures: values.noFeatures,
        price: values.price,
      };
      // logic gửi dữ liệu qua API
      const response = await UpdateMemberShip(
        membershipData.memberShipId,
        dataInput
      );
      if (response.status != StatusCode.UPDATED) {
        toast.error(Messages.ERROR.BAD_REQUEST);
        return;
      }
      if (response.status == StatusCode.UPDATED) {
        setIsCreated((prevIsCreated) => !prevIsCreated);
        toast.success(Messages.SUCCESS.UPDATE);
        setCentredModal(false);
      }
    }
  };

  return (
    <MDBModal
      tabIndex="-1"
      open={centredModal}
      onClose={() => setCentredModal(false)}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Chỉnh sửa thông báo</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setCentredModal(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <Formik
            initialValues={{
              membershipName: membershipData?.memberShipName || "",
              features: membershipData?.features || [],
              noFeatures: membershipData?.noFeatures || [],
              price: membershipData?.price || 0,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <MDBModalBody>
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Tên membership: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBInput}
                        name="membershipName"
                        label="Tên gói"
                        type="text"
                      />
                      <ErrorMessage
                        name="membershipName"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Chức năng có: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBTextArea}
                        name="features"
                        label="Chức năng có"
                        rows={3}
                        value={values.features.join("\n")}
                        onChange={(e) =>
                          setFieldValue("features", e.target.value.split("\n"))
                        }
                      />
                      <ErrorMessage
                        name="features"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Chức năng hạn chế: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBTextArea}
                        name="noFeatures"
                        label="Chức năng hạn chế"
                        rows={3}
                        value={values.noFeatures.join("\n")}
                        onChange={(e) =>
                          setFieldValue(
                            "noFeatures",
                            e.target.value.split("\n")
                          )
                        }
                      />
                      <ErrorMessage
                        name="noFeatures"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Giá: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field as={MDBInput} name="price" type="number" />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                  <Button color="error" onClick={() => setCentredModal(false)}>
                    Close
                  </Button>
                  <Button type="submit">Lưu thay đổi</Button>
                </MDBModalFooter>
              </Form>
            )}
          </Formik>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
