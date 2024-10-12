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
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import { CreatePassage } from "../../../api/PassageApi";

export default function CreatePassageModal({
  centredModal,
  setCentredModal,
  setIsCreated,
}) {
  const validationSchema = Yup.object({
    passageTitle: Yup.string().required("Required"),
    passageContent: Yup.string().required("Required"),
    subQuestion: Yup.array().of(
      Yup.object({
        questionText: Yup.string().required("Required"),
        correctAnswer: Yup.string().when("questionType", {
          is: "multiple_choice",
          then: Yup.string().required("Required for multiple choice"),
        }),
        wordsLimit: Yup.number().when("questionType", {
          is: "writing_task_1",
          then: Yup.number()
            .min(1, "Must be greater than 0")
            .required("Required for writing task"),
        }),
        choices: Yup.array().when("questionType", {
          is: "multiple_choice",
          then: Yup.array()
            .of(
              Yup.object({
                choiceContent: Yup.string().required(
                  "Choice content is required"
                ),
              })
            )
            .min(1, "At least one choice is required"),
        }),
      })
    ),
    sections: Yup.array().of(
      Yup.object({
        sectionLabel: Yup.string().required("Required"),
        sectionContent: Yup.string().required("Required"),
      })
    ),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await CreatePassage(values);
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
              subQuestion: [
                {
                  questionText: "",
                  correctAnswer: "",
                  questionType: "fill_in_blank",
                  wordsLimit: 0,
                  choices: [],
                },
              ],
              sections: [{ sectionLabel: "", sectionContent: "" }],
            }}
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
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

                  {/* Sub Questions */}
                  <FieldArray name="subQuestion">
                    {({ push, remove }) => (
                      <>
                        {values.subQuestion.map((subQuestion, index) => (
                          <div key={index}>
                            <MDBRow style={{ marginTop: "20px" }}>
                              <MDBCol sm="4">
                                <MDBCardText>
                                  Sub Question {index + 1}:
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="8">
                                <Field
                                  as={MDBInput}
                                  name={`subQuestion[${index}].questionText`}
                                  label="Question Text"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`subQuestion[${index}].questionText`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </MDBCol>
                            </MDBRow>

                            <MDBRow style={{ marginTop: "20px" }}>
                              <MDBCol sm="4">
                                <MDBCardText>Question Type:</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="8">
                                <Field
                                  as="select"
                                  name={`subQuestion[${index}].questionType`}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `subQuestion[${index}].questionType`,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="multiple_choice">
                                    Multiple Choice
                                  </option>
                                  <option value="heading_matching">
                                    Heading Matching
                                  </option>
                                  <option value="fill_in_blank">
                                    Fill in Blank
                                  </option>
                                  <option value="writing_task_1">
                                    Writing Task 1
                                  </option>
                                </Field>
                                <ErrorMessage
                                  name={`subQuestion[${index}].questionType`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </MDBCol>
                            </MDBRow>

                            {/* Correct Answer Field */}
                            {subQuestion.questionType !== "writing_task_1" && (
                              <MDBRow
                                style={{
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                }}
                              >
                                <MDBCol sm="4">
                                  <MDBCardText>Correct Answer:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                  <Field
                                    as={MDBInput}
                                    name={`subQuestion[${index}].correctAnswer`}
                                    label="Correct Answer"
                                    type="text"
                                  />
                                  <ErrorMessage
                                    name={`subQuestion[${index}].correctAnswer`}
                                    component="div"
                                    className="text-red-500"
                                  />
                                </MDBCol>
                              </MDBRow>
                            )}

                            {/* Word Limit for Writing Task */}
                            {subQuestion.questionType === "writing_task_1" && (
                              <MDBRow style={{ marginTop: "20px" }}>
                                <MDBCol sm="4">
                                  <MDBCardText>Word Limit:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                  <Field
                                    as={MDBInput}
                                    name={`subQuestion[${index}].wordsLimit`}
                                    type="number"
                                  />
                                  <ErrorMessage
                                    name={`subQuestion[${index}].wordsLimit`}
                                    component="div"
                                    className="text-red-500"
                                  />
                                </MDBCol>
                              </MDBRow>
                            )}

                            {/* Choices for Multiple Choice */}
                            {subQuestion.questionType == "multiple_choice" && (
                              <FieldArray
                                name={`subQuestion[${index}].choices`}
                              >
                                {({ push, remove }) => (
                                  <>
                                    {subQuestion.choices.map(
                                      (choice, choiceIndex) => (
                                        <div
                                          key={choiceIndex}
                                          style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <MDBInput
                                            label={`Choice ${choiceIndex + 1}`}
                                            type="text"
                                            value={choice.choiceContent}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `subQuestion[${index}].choices[${choiceIndex}].choiceContent`,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <IconButton
                                            color="error"
                                            onClick={() => remove(choiceIndex)} // Xóa choice theo đúng index
                                            style={{ marginLeft: "10px" }}
                                          >
                                            <Delete />
                                          </IconButton>
                                        </div>
                                      )
                                    )}
                                    <Button
                                      onClick={() =>
                                        push({ choiceContent: "" })
                                      }
                                      style={{ marginTop: "10px" }}
                                    >
                                      Add Choice
                                    </Button>
                                  </>
                                )}
                              </FieldArray>
                            )}
                            {subQuestion.questionType == "heading_matching" && (
                              <FieldArray
                                name={`subQuestion[${index}].choices`}
                              >
                                {({ push, remove }) => (
                                  <>
                                    {subQuestion.choices.map(
                                      (choice, choiceIndex) => (
                                        <div
                                          key={choiceIndex}
                                          style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <MDBInput
                                            label={`Choice ${choiceIndex + 1}`}
                                            type="text"
                                            value={choice.choiceContent}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `subQuestion[${index}].choices[${choiceIndex}].choiceContent`,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <IconButton
                                            color="error"
                                            onClick={() => remove(choiceIndex)} // Xóa choice theo đúng index
                                            style={{ marginLeft: "10px" }}
                                          >
                                            <Delete />
                                          </IconButton>
                                        </div>
                                      )
                                    )}
                                    <Button
                                      onClick={() =>
                                        push({ choiceContent: "" })
                                      }
                                      style={{ marginTop: "10px" }}
                                    >
                                      Add Choice
                                    </Button>
                                  </>
                                )}
                              </FieldArray>
                            )}
                          </div>
                        ))}
                        <Button
                          onClick={() =>
                            push({
                              questionText: "",
                              correctAnswer: "",
                              questionType: "multiple_choice",
                              wordsLimit: 0,
                              choices: [{ choiceContent: "" }],
                            })
                          }
                        >
                          Add Sub Question
                        </Button>
                        <IconButton
                          color="error"
                          onClick={() => remove(values.subQuestion.length - 1)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </FieldArray>

                  {/* Sections */}
                  <FieldArray name="sections">
                    {({ push, remove }) => (
                      <>
                        {values.sections.map((section, index) => (
                          <div key={index}>
                            <MDBRow style={{ marginTop: "20px" }}>
                              <MDBCol sm="4">
                                <MDBCardText>
                                  Section {index + 1} Label:
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="8">
                                <Field
                                  as={MDBInput}
                                  name={`sections[${index}].sectionLabel`}
                                  label="Section Label"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`sections[${index}].sectionLabel`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </MDBCol>
                            </MDBRow>

                            <MDBRow style={{ marginTop: "20px" }}>
                              <MDBCol sm="4">
                                <MDBCardText>
                                  Section {index + 1} Content:
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="8">
                                <Field
                                  as={MDBTextArea}
                                  name={`sections[${index}].sectionContent`}
                                  label="Section Content"
                                  rows={4}
                                />
                                <ErrorMessage
                                  name={`sections[${index}].sectionContent`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </MDBCol>
                            </MDBRow>
                          </div>
                        ))}
                        <Button
                          onClick={() =>
                            push({ sectionLabel: "", sectionContent: "" })
                          }
                        >
                          Add Section
                        </Button>
                        <IconButton
                          color="error"
                          onClick={() => remove(values.sections.length - 1)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </FieldArray>
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
