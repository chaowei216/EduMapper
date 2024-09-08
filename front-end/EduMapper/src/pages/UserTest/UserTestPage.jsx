import HeaderTesting from "../../components/global/HeaderTesting";
import TestProgress from "../../components/partial/UserTesting/PartQuestion";
import ReadingTest from "../../components/partial/UserTesting/ReadingTest";
function UserTestPage() {
  return (
    <div className="overflow-hidden">
      <div
        className="fixed top-0 left-0 right-0 z-10"
        style={{ border: "1px solid #dcdcdc" }}
      >
        <HeaderTesting />
      </div>
        <ReadingTest />
      <TestProgress />
    </div>
  );
}

export default UserTestPage;
