import { useEffect, useState } from "react";
import HeaderTesting from "../../components/global/HeaderTesting";
import TestProgress from "../../components/partial/UserTesting/PartQuestion";
import ReadingTest from "../../components/partial/UserTesting/ReadingTest";
import WritingTest from "../../components/partial/UserTesting/WritingTest";
function WritingTestPage() {
  const [passages, setPassages] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPassage, setCurrentPassage] = useState(0);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch("/src/data/test2.json"); // Adjust path as necessary
        const data = await response.json();
        setPassages(data.Tests[0].Exams[2].Passages); // Adjust based on your JSON structure
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchTestData();
  }, []);

  const handleSubmit = () => {
    console.log(selectedAnswers);
  };

  const handlePassageChange = (index) => {
    setCurrentPassage(index);
  };

  const getAnsweredCount = (passageIndex) => {
    return (
      passages[passageIndex]?.SubQuestions.filter(
        (q) => selectedAnswers[q.QuestionId]
      ).length || 0
    );
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

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
        <WritingTest
          passages={passages}
          currentPassage={currentPassage}
          selectedAnswers={selectedAnswers}
          handleAnswerChange={handleAnswerChange}
          handleSubmit={handleSubmit}
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
        />
      </div>
    </div>
  );
}

export default WritingTestPage;
