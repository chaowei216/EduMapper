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
import { CreatePassageExceptIelts } from "../../../api/PassageApi";

export default function CreatePassage2({
  centredModal,
  setCentredModal,
  setIsCreated,
}) {
  const validationSchema = Yup.object({
    passageTitle: Yup.string().required("Required"),
    passageContent: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await CreatePassageExceptIelts(values);
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
              <Form>
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
