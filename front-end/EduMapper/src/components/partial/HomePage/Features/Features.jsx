import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import styles from "./Features.module.css";

// Dữ liệu cứng tạm thời
const mockData = [
  {
    userId: 1,
    userImage: "path/to/image1.jpg",
    fullName: "Nguyễn Văn A",
    userClasses: [
      { class: { classId: 1, className: "Toán" } },
      { class: { classId: 2, className: "Lý" } },
    ],
    userCourses: [
      { course: { courseId: 1, courseName: "Giải tích" } },
      { course: { courseId: 2, courseName: "Vật lý đại cương" } },
    ],
    averageRating: 4.5,
  },
  {
    userId: 2,
    userImage: "path/to/image2.jpg",
    fullName: "Trần Thị B",
    userClasses: [
      { class: { classId: 3, className: "Hóa" } },
      { class: { classId: 4, className: "Sinh" } },
    ],
    userCourses: [
      { course: { courseId: 3, courseName: "Hóa hữu cơ" } },
      { course: { courseId: 4, courseName: "Sinh học tế bào" } },
    ],
    averageRating: 3.8,
  },
  {
    userId: 3,
    userImage: "path/to/image3.jpg",
    fullName: "Lê Văn C",
    userClasses: [
      { class: { classId: 5, className: "Anh" } },
      { class: { classId: 6, className: "Tin" } },
    ],
    userCourses: [
      { course: { courseId: 5, courseName: "Tiếng Anh giao tiếp" } },
      { course: { courseId: 6, courseName: "Lập trình cơ bản" } },
    ],
    averageRating: 4.9,
  },
];

const Features = () => {
  const [features] = useState(mockData); // Sử dụng dữ liệu cứng tạm thời
  const [error, setError] = useState(null);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`star-${i}`} icon={faStar} color="gold" />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesomeIcon key="half-star" icon={faStarHalfAlt} color="gold" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-star-${i}`}
          icon={faStarEmpty}
          className={styles.emptyStar}
        />
      );
    }

    return (
      <div className={styles.ratingStars}>
        {stars.map((star, index) => (
          <span style={{ color: "#ddd" }} key={index}>
            {star}
          </span>
        ))}
        <span className={styles.ratingValue}>{rating}</span>
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`${styles.featuresWrapper} center`}>
      <div className={styles.featuresHeading}>
        <h1 style={{ fontFamily: "cursive", color: "#E81C4B" }}>
          CÁC GIA SƯ TIÊU BIỂU ĐƯỢC PHỤ HUYNH TIN TƯỞNG
        </h1>
      </div>
      <div className={styles.featuresListWrapper}>
        <Slider {...settings} className={styles.featuresList}>
          {features &&
            features.map((feature) => (
              <div
                key={feature.userId}
                className={`container ${styles.swiper}`}
              >
                <div className={`swiper-wrapper ${styles.content}`}>
                  <div className={`swiper-slide ${styles.card}`}>
                    <div className={styles.cardContent}>
                      <div className={styles.image}>
                        <img src={feature.userImage} alt={feature.fullName} />
                      </div>
                      <div className={styles.cardBody}>
                        <h5
                          className="card-title"
                          style={{
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                          }}
                        >
                          {feature.fullName}
                        </h5>
                        <div
                          className={styles.boxItem}
                          style={{ display: "flex", marginTop: "5px" }}
                        >
                          <p>Lớp dạy:</p>
                          <div className={styles.classList}>
                            {feature.userClasses.map((userClass) => (
                              <div
                                key={userClass.class.classId}
                                className={styles.class}
                              >
                                {userClass.class.className}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div
                          className={styles.boxItem}
                          style={{ display: "flex" }}
                        >
                          <p>Môn dạy:</p>
                          <div className={styles.courseList}>
                            {feature.userCourses.map((course) => (
                              <div
                                key={course.course.courseId}
                                className={styles.course}
                              >
                                {course.course.courseName}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {renderStars(feature.averageRating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Features;
