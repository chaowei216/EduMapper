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
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import { useState } from "react";
import { CreatePassageWithListening } from "../../../api/PassageApi";

export default function CreatePassageListening(pros) {
  const { centredModal, setCentredModal, setIsCreated } = pros;
  // State để lưu file
  const [file, setFile] = useState(null);

  const validationSchema = Yup.object({
    passageTitle: Yup.string().required("Required"),
    passageContent: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("passageTitle", values.passageTitle);
    formData.append("passageContent", values.passageContent);
    if (file) {
      formData.append("file", file); // Thêm file vào formData
    }

    const response = await CreatePassageWithListening(formData);
    if (response.status !== StatusCode.CREATED) {
      toast.error(Messages.ERROR.BAD_REQUEST);
      return;
    }
    const responseJson = await response.json();
    if (responseJson.statusCode === StatusCode.CREATED) {
      setIsCreated((prevIsCreated) => !prevIsCreated);
      toast.success(Messages.SUCCESS.CREATE);
      setCentredModal(false);
    }
  };

  return (
    <MDBModal
      tabIndex="-1"
      open={centredModal}
      onClose={() => setCentredModal(false)}
    >
      <MDBModalDialog size="lg" centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Create Passage</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setCentredModal(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <Formik
            initialValues={{
              passageTitle: "",
              passageContent: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form encType="multipart/form-data">
                <MDBModalBody>
                  {/* Passage Title */}
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Passage Title:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBInput}
                        name="passageTitle"
                        label="Passage Title"
                        type="text"
                      />
                      <ErrorMessage
                        name="passageTitle"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* Passage Content */}
                  <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Passage Content:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBTextArea}
                        name="passageContent"
                        label="Passage Content"
                        rows={4}
                      />
                      <ErrorMessage
                        name="passageContent"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* File Upload */}
                  <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Upload MP3 File:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input
                        type="file"
                        name="file"
                        accept=".mp3"
                        onChange={(event) => {
                          setFile(event.currentTarget.files[0]);
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn
                    color="secondary"
                    onClick={() => setCentredModal(false)}
                  >
                    Close
                  </MDBBtn>
                  <MDBBtn color="primary" type="submit">
                    Save changes
                  </MDBBtn>
                </MDBModalFooter>
              </Form>
            )}
          </Formik>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
