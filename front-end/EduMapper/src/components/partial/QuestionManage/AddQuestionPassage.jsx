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
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import { AddQuestionToPassage, GetAllPassage } from "../../../api/PassageApi";

export default function AddQuestionPassage(pros) {
  const { passageModal, setPassageModal, setIsCreated, questionId } = pros;
  const [passages, setPassages] = useState();
  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const data = await GetAllPassage();
        const dataJson = await data.json();
        setPassages(dataJson.metaData);
        console.log(dataJson);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchPassage();
  }, []);
  const handleSubmit = async (values) => {
    const dataInput = {
      passageId: values.passageId,
      questionIds: questionId,
    };
    if (dataInput.passageId == "") {
      toast.error(Messages.ERROR.REQUIRED_FIELD);
    }
    const response = await AddQuestionToPassage(dataInput);
    if (response.status !== StatusCode.UPDATED) {
      toast.error(Messages.ERROR.BAD_REQUEST);
      return;
    }
    const responseJson = await response.json();
    if (responseJson.statusCode === StatusCode.UPDATED) {
      setIsCreated((prevIsCreated) => !prevIsCreated);
      toast.success(Messages.SUCCESS.CREATE);
      setPassageModal(false);
    }
  };

  return (
    <MDBModal
      tabIndex="-1"
      open={passageModal}
      onClose={() => setPassageModal(false)}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Thêm câu hỏi vào đoạn văn</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setPassageModal(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <Formik
            initialValues={{
              passageId: "", // Select để chọn passageId
            }}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <MDBModalBody>
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText style={{ marginTop: "8px" }}>
                        Chọn Passage ID:{" "}
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <Field
                        as="select"
                        name="passageId"
                        className="form-select"
                        onChange={(e) =>
                          setFieldValue("passageId", e.target.value)
                        }
                      >
                        <option value="">Chọn Passage</option>
                        {passages &&
                          passages.map((passage, index) => (
                            <option key={index + 1} value={passage.passageId}>
                              {passage.passageTitle}
                            </option>
                          ))}
                      </Field>
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                  <Button color="error" onClick={() => setPassageModal(false)}>
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
