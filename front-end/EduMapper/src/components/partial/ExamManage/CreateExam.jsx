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
  MDBInput,
} from "mdb-react-ui-kit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import { GetAllPassage } from "../../../api/PassageApi";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { CreateAllExam } from "../../../api/ExamApi";

export default function CreateExam({
  centredModal,
  setCentredModal,
  setIsCreated,
}) {
  const [passagesList, setPassagesList] = useState();
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await GetAllPassage();
        const dataJson = await response.json();
        setPassagesList(dataJson.metaData.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchExam();
  }, []);
  const validationSchema = Yup.object({
    passageIds: Yup.array().min(1, "Required"),
    examName: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    const response = await CreateAllExam(values);
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
              passageIds: [], // Chọn nhiều Passage
              examName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <MDBModalBody>
                  <MDBRow style={{marginBottom: "30px"}}>
                    <MDBCol sm="4">
                      <MDBCardText>Tên bài thi: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBInput}
                        name="examName"
                        label="Tên exam"
                        type="text"
                      />
                      <ErrorMessage
                        name="examName"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* Passage Title */}
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText style={{ marginTop: "8px" }}>
                        Chọn các đoạn văn:
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Autocomplete
                        multiple
                        options={(passagesList && passagesList.length != undefined) ? (passagesList) : []} // List passages
                        getOptionLabel={(option) => option.passageTitle}
                        onChange={(event, newValue) =>
                          setFieldValue(
                            "passageIds",
                            newValue.map((option) => option.passageId)
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Chọn Passage"
                            placeholder="Chọn Passage"
                          />
                        )}
                      />
                      <ErrorMessage
                        name="passageIds"
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
