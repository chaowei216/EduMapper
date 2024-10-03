import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import ChatForum from "../../components/partial/Chat/ChatForum";
export default function ContactPage() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <ChatForum />
      </div>
    </div>
  );
}
