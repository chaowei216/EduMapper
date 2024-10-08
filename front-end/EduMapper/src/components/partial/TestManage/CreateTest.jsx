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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { CreateTestApi } from "../../../api/TestManageApi";
import { GetAllExam } from "../../../api/ExamApi";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function CreateTest({
  centredModal,
  setCentredModal,
  setIsCreated,
}) {
  const [examList, setExamList] = useState();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await GetAllExam();
        const dataJson = await response.json();
        setExamList(dataJson.metaData.data);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      }
    };

    fetchExam();
  }, []);

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    description: Yup.string().required("Description is required"),
    isRequired: Yup.boolean().required("This field is required"),
    examIds: Yup.array().min(1, "At least one exam must be selected"),
  });

  const handleSubmit = async (values) => {
    const response = await CreateTestApi(values);
    if (response.status !== StatusCode.CREATED) {
      toast.error(Messages.ERROR.ALREADY_EXAM);
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
            <MDBModalTitle>Create Exam</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setCentredModal(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <Formik
            initialValues={{
              type: "",
              description: "",
              isRequired: false,
              examIds: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <MDBModalBody>
                  {/* Type */}
                  <MDBRow style={{ marginBottom: "30px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Loại đề: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field as="select" name="type" className="form-control">
                        <option value="">Chọn loại đề</option>
                        <option value="IETLS">Ielts</option>
                        <option value="TOEIC">Toeic</option>
                      </Field>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* Description */}
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Mô tả:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as={MDBInput}
                        name="description"
                        label="Description"
                        type="text"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* Is Required */}
                  <MDBRow style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Có bắt buộc không:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field name="isRequired">
                        {({ field }) => (
                          <RadioGroup
                            row
                            {...field}
                            onChange={(event) =>
                              setFieldValue(
                                "isRequired",
                                event.target.value === "true"
                              )
                            }
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio />}
                              label="Có"
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio />}
                              label="Không"
                            />
                          </RadioGroup>
                        )}
                      </Field>
                      <ErrorMessage
                        name="isRequired"
                        component="div"
                        className="text-red-500"
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* Exam IDs */}
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Chọn các đề thi:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Autocomplete
                        multiple
                        options={examList ?? []} // List exams
                        getOptionLabel={(option) => option.examName}
                        onChange={(event, newValue) =>
                          setFieldValue(
                            "examIds",
                            newValue.map((option) => option.examId)
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select Exam"
                            placeholder="Select Exam"
                          />
                        )}
                      />
                      <ErrorMessage
                        name="examIds"
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
