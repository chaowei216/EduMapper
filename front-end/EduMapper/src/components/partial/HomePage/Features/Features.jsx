import styles from "./Features.module.css";

const Features = () => {
  return (
    <div className={`${styles.featuresWrapper} center`}>
      <div className={styles.featuresHeading}>
        <h1
          style={{
            color: "#FFF",
            textAlign: "right",
            fontFamily: "Inter",
            fontSize: "80px",
            fontStyle: "normal",
            fontWeight: 800,
            lineHeight: "normal",
            letterSpacing: "3px",
          }}
        >
          Về chúng tôi <br />
          Edummaper
        </h1>
      </div>
      <img
        className={styles.image}
        style={{
          position: "absolute",
          top: "16.55%",
          left: "80%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
        src="/img/hinhBackground.png"
      ></img>
      <div className={styles.featuresListWrapper}>
        <div className={styles.container_content}>
          <div className={styles.body_content}>
            <div className={styles.content}>
              EduMapper là một trang web dành cho ngôn ngữ tiếng Anh. Khách hàng
              có thể kiểm tra khả năng nói tiếng Anh, trung tâm ôn tập và tham
              gia các khóa học trực tuyến thông qua website. Điều đặc biệt là
              mọi thứ sẽ công bằng, chính xác, chấm điểm và đánh giá chính xác
              để khách hàng có thể lựa chọn trung tâm phù hợp nhất với mình.
              Ngoài ra, đây còn là nơi để mọi người trò chuyện và giúp đỡ nhau
              học hỏi thông qua trò chuyện nhóm cộng đồng.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
