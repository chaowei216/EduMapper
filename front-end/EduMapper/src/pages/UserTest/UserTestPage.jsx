import HeaderTesting from "../../components/global/HeaderTesting";
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
      <div className="fixed top-28 left-0 right-0 z-10">
        <ReadingTest />
      </div>
    </div>
  );
}

export default UserTestPage;
