import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import ViewCourse from "../../components/partial/Course/ViewCourse";
export default function CoursePage() {
  return (
    <div className="App">
      <Navbar />
      <ViewCourse />
      <Footer />
    </div>
  );
}
