import { useEffect, useState } from "react";
import HeaderTesting from "../../components/global/HeaderTesting";
import TestProgress from "../../components/partial/UserTesting/PartQuestion";
import ListeningTest from "../../components/partial/UserTesting/ListeningTest";
import { useNavigate, useParams } from "react-router-dom";
import { GetListeningTest } from "../../api/TestManageApi";
function ListeningTestPage() {
  let { testId } = useParams();
  const [passages, setPassages] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentPassage, setCurrentPassage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await GetListeningTest(testId);
        const data = await response.json();
        const test = data.metaData;
        setPassages(test[0]?.exams[0]?.passages);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchTestData();
  }, [testId]);

  const handleSubmit = () => {
    console.log(selectedAnswers);
    navigate('/test-result')
  };

  const handlePassageChange = (index) => {
    setCurrentPassage(index);
  };

  const getAnsweredCount = (passageIndex) => {
    // Lấy danh sách câu hỏi từ đoạn văn cụ thể
    const questions = passages[passageIndex]?.subQuestion || [];

    // Đếm số câu hỏi đã trả lời dựa vào selectedAnswers
    return questions.reduce((count, question) => {
      // Kiểm tra xem câu hỏi có tồn tại trong selectedAnswers và có giá trị không
      return selectedAnswers.find(
        (answer) => answer.questionId === question.questionId
      )
        ? count + 1
        : count;
    }, 0);
  };

  const handleAnswerChange = (questionId, choiceId, userChoice) => {
    setSelectedAnswers((prevAnswers) => {
      // Tìm câu trả lời đã tồn tại cho câu hỏi này
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      const newAnswer = {
        userId: "test",
        questionId: questionId,
        choiceId: choiceId || null, // Nếu không có lựa chọn (cho điền trống)
        userChoice: userChoice || null,
        description: "", // Có thể thêm mô tả tùy theo tình huống
      };

      // Nếu đã có câu trả lời cho câu hỏi này, cập nhật nó
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        return updatedAnswers;
      }

      // Nếu chưa có, thêm mới
      return [...prevAnswers, newAnswer];
    });
  };

  // const handleAnswerChange = (questionId, answer) => {
  //   setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  // };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div
        className="fixed top-0 left-0 right-0 z-10"
        style={{ border: "1px solid #dcdcdc" }}
      >
        <HeaderTesting handleSubmit={handleSubmit} />
      </div>
      <div
        className="flex-1 mt-[60px] overflow-y-auto"
        style={{ marginTop: "6rem" }}
      >
        <ListeningTest
          passages={passages}
          currentPassage={currentPassage}
          selectedAnswers={selectedAnswers}
          handleAnswerChange={handleAnswerChange}
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
        />
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 z-10"
        style={{ border: "1px solid #dcdcdc" }}
      >
        <TestProgress
          handlePassageChange={handlePassageChange}
          getAnsweredCount={getAnsweredCount}
          passages={passages}
          currentPassage={currentPassage}
          selectedAnswers={selectedAnswers}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}

export default ListeningTestPage;
