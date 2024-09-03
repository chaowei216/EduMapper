// Components import
import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Hero from "../../components/partial/HomePage/Hero/Hero";
import Features from "../../components/partial/HomePage/Features/Features";
import Growth from "../../components/partial/HomePage/Growth/Growth";
import Questions from "../../components/partial/HomePage/Questions/Questions";
import Programs from "../../components/partial/HomePage/Programs/Programs";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import "../../index.css";
import MainHero from "../../components/partial/HomePage/Hero/MainHero";
import MainFeature from "../../components/partial/HomePage/Features/MainFeature";
import MainPackage from "../../components/partial/HomePage/Growth/MainPackage";
import MainCourseAndClip from "../../components/partial/HomePage/Programs/MainCourseAndClip";

const HomePage = () => {
  return (
    <div className="App">
      <Navbar />
      <MainHero>
        <Hero />
      </MainHero>
      <MainFeature>
        <Features />
      </MainFeature>
      <MainPackage>
        <Growth />
      </MainPackage>
      <MainCourseAndClip>
        <Programs />
        <Questions />
      </MainCourseAndClip>
      <Footer />
    </div>
  );
};

export default HomePage;
