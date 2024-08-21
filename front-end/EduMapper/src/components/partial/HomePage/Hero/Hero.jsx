import Slider from "react-slick";
import styles from "./Hero.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const items = [
    {
      image: "https://picsum.photos/800/400?random=1",
      alt: "Image 1",
      caption: "Caption 1",
    },
    {
      image: "https://picsum.photos/800/400?random=2",
      alt: "Image 2",
      caption: "Caption 2",
    },
    {
      image: "https://picsum.photos/800/400?random=3",
      alt: "Image 3",
      caption: "Caption 3",
    },
  ];

  // const settings = {
  //   dots: true, // Hiển thị các chấm điều hướng
  //   infinite: true, // Vòng lặp liên tục
  //   speed: 200, // Tốc độ chuyển slide
  //   slidesToShow: 1, // Hiển thị 1 slide tại một thời điểm
  //   slidesToScroll: 1, // Cuộn 1 slide mỗi lần
  // };

  const settings = {
    dots: true, // Hiển thị các chấm điều hướng
    infinite: true, // Vòng lặp liên tục
    speed: 2000, // Tốc độ chuyển slide (ms)
    slidesToShow: 1, // Hiển thị 1 slide tại một thời điểm
    slidesToScroll: 1, // Cuộn 1 slide mỗi lần
    autoplay: true, // Kích hoạt tính năng tự động cuộn
    autoplaySpeed: 1000, // Thời gian giữa các lần cuộn (ms)
    pauseOnHover: true, // Tạm dừng cuộn khi di chuột qua
  };


  return (
    <div className={styles.heroWrapper}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className={styles.slideItem}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={item.image}
              alt={item.alt}
            />
            <div className={styles.caption}>{item.caption}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
