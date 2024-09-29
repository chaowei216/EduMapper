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
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import { CreateQuestion } from "../../../api/QuestionManageApi";

export default function CreateQuestionModal({ centredModal, setCentredModal, setIsCreated }) {
  const [choices, setChoices] = useState([{ ChoiceId: 1, ChoiceContent: "" }]);

  const addChoice = () => {
    setChoices([...choices, { ChoiceId: choices.length + 1, ChoiceContent: "" }]);
  };

  const removeLastChoice = () => {
    setChoices(choices.slice(0, -1));
  };

  const handleSubmit = async (values) => {
    const dataInput = {
      questionText: values.questionText,
      correctAnswer: values.questionType === "writing_task" ? "Empty" : values.correctAnswer,
      questionType: values.questionType,
      wordsLimit: values.questionType === "writing_task" ? values.wordsLimit : 0,
      choices: values.questionType === "multiple_choice" ? choices : [],
    };

    const response = await CreateQuestion(dataInput);
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
    <MDBModal tabIndex="-1" open={centredModal} onClose={() => setCentredModal(false)}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Tạo câu hỏi mới</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={() => setCentredModal(false)}></MDBBtn>
          </MDBModalHeader>
          <Formik
            initialValues={{
              questionText: "",
              correctAnswer: "",
              questionType: "multiple_choice",
              wordsLimit: 0,
            }}
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <MDBModalBody>
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Câu hỏi: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field as={MDBInput} name="questionText" label="Câu hỏi" type="text" />
                      <ErrorMessage name="questionText" component="div" className="text-red-500" />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol sm="4">
                      <MDBCardText>Loại câu hỏi: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as="select"
                        name="questionType"
                        onChange={(e) => setFieldValue("questionType", e.target.value)}
                      >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="heading_matching">Heading Matching</option>
                        <option value="fill_in_blank">Fill in Blank</option>
                        <option value="writing_task">Writing Task</option>
                      </Field>
                      <ErrorMessage name="questionType" component="div" className="text-red-500" />
                    </MDBCol>
                  </MDBRow>

                  {values.questionType === "writing_task" && (
                    <MDBRow style={{ marginTop: "20px" }}>
                      <MDBCol sm="4">
                        <MDBCardText>Giới hạn từ: </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="8">
                        <Field as={MDBInput} name="wordsLimit" type="number" />
                        <ErrorMessage name="wordsLimit" component="div" className="text-red-500" />
                      </MDBCol>
                    </MDBRow>
                  )}

                  {values.questionType !== "writing_task" && (
                    <>
                      <MDBRow style={{ marginTop: "20px" }}>
                        <MDBCol sm="4">
                          <MDBCardText>Đáp án đúng: </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="8">
                          <Field as={MDBInput} name="correctAnswer" type="text" />
                          <ErrorMessage name="correctAnswer" component="div" className="text-red-500" />
                        </MDBCol>
                      </MDBRow>

                      {values.questionType === "multiple_choice" && (
                        <MDBRow style={{ marginTop: "20px" }}>
                          <MDBCol sm="4">
                            <MDBCardText>Lựa chọn: </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="8">
                            {choices.map((choice, index) => (
                              <div key={index} style={{ marginBottom: "10px" }}>
                                <MDBInput
                                  label={`Lựa chọn ${index + 1}`}
                                  type="text"
                                  value={choice.ChoiceContent}
                                  onChange={(e) =>
                                    setChoices((prevChoices) =>
                                      prevChoices.map((c, i) =>
                                        i === index ? { ...c, ChoiceContent: e.target.value } : c
                                      )
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <Button onClick={addChoice}>Thêm lựa chọn</Button>
                            <IconButton color="error" onClick={removeLastChoice}>
                              <Delete />
                            </IconButton>
                          </MDBCol>
                        </MDBRow>
                      )}
                    </>
                  )}
                </MDBModalBody>
                <MDBModalFooter>
                  <Button color="error" onClick={() => setCentredModal(false)}>
                    Đóng
                  </Button>
                  <Button type="submit">Lưu</Button>
                </MDBModalFooter>
              </Form>
            )}
          </Formik>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
