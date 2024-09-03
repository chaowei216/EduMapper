import Slider from "react-slick";
import styles from "./Hero.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const items = [
    {
      image: "/img/Rectangle9.png",
      alt: "Image 1",
    },
    {
      image: "/img/trungtam5.png",
      alt: "Image 2",
    },
    {
      image: "/img/trungtam4.png",
      alt: "Image 3",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.test}>
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className={styles.slideItem}>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src={item.image}
                alt={item.alt}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
