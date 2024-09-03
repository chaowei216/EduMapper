import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./Growth.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const packageData = [
  {
    name: "Free",
    features: [
      "Miễn phí test Reading",
      "Miễn phí test Listening",
      "Công đồng chat",
    ],
    no_features: [
      "Làm test kĩ năng Writing",
      "Làm test kĩ năng Speaking",
      "Sửa lỗi phát âm và vốn từ vựng",
      "Meeting online chấm speaking",
      "Sửa lỗi",
    ],
    price: "Free",
  },
  {
    name: "Premium Package",
    features: [
      "Được chấm bài gợi ý điểm",
      "Luyện tập từ vựng Writing",
      "Luyện tập từ vựng Speaking",
      "Bài chấm Writing chưa là và sau khi",
      "Meeting online cùng Speaking",
      "Sửa lỗi phát âm và văn từ vựng",
      "Nhận bản mẫu điểm cũng như tin tức trên 2 kỳ thi Writing and Speaking",
    ],
    no_features: ["Làm test kỹ năng Reading ", "Làm test kỹ năng Writing "],
    price: "399.000 vnd/lần",
  },
  {
    name: "Premium Plus Package",
    features: [
      "Test 4 kỹ năng Listening, Reading, Writing, Speaking",
      "Biết được điểm mạnh và điểm yếu trong phần làm bài của mình",
      "Bài chấm Writing chưa là và sau khi",
      "Meeting online cùng Speaking",
      "Sửa lỗi phát âm và văn từ vựng trong Speaking",
      "Biết được lỗi sai và cách gỡi lỗi của Listening và Reading",
      "Nhận bản điểm của mình dựa trên 4 kỳ thi",
    ],
    price: "649.000 vnd/lần",
  },
  {
    name: "Children Package",
    features: [
      "Test 4 kỹ năng Listening, Reading, Writing, Speaking",
      "Biết được điểm mạnh và điểm yếu trong phần làm bài của mình",
      "Bài chấm Writing chưa là và sau khi",
      "Meeting online cùng Speaking",
      "Sửa lỗi phát âm và văn từ vựng trong Speaking",
      "Biết được lỗi sai và cách gỡi lỗi của Listening và Reading",
      "Nhận bản điểm của mình dựa trên 4 kỳ thi",
    ],
    price: "149.000 vnd/lần",
  },
];

const Growth = () => {
  return (
    <div className={styles.package_container}>
      <div className={styles.package_content}>
        <Box pt={3} style={{ background: "#66D4A9", borderRadius: "15px" }}>
          <Grid
            container
            sx={{
              "@media (max-width: 1654px)": {
                gridTemplateColumns: "repeat(2, 1fr)", // 2 cột khi màn hình <= 1654px
              },
            }}
          >
            {packageData.map((plan, index) => (
              <Grid item xs={12} sm={6} md={6} custom={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: "83%",
                    width: "380px",
                    margin: "0 auto",
                    borderRadius: "20px",
                    background: "#CEFFEC",
                    fontFamily: "Inter",
                    boxShadow: "20px 15px 28.4px -1px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <Typography
                    style={{
                      color: "#0A5839",
                      fontFamily: "Inter",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 800,
                      lineHeight: "normal",
                      marginBottom: "40px",
                    }}
                    variant="h5"
                    gutterBottom
                    textAlign={"center"}
                  >
                    {plan.name}
                  </Typography>
                  <hr style={{ border: "6px solid #57B791" }}></hr>
                  <List>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText style={{ color: "#2E7D32" }}>
                          {feature}
                        </ListItemText>
                      </ListItem>
                    ))}
                    {plan.no_features &&
                      plan.no_features.length > 0 &&
                      plan.no_features.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <HighlightOffIcon color="#818181" />
                          </ListItemIcon>
                          <ListItemText style={{ color: "#818181" }}>
                            {item}
                          </ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Paper>
                <Paper
                  sx={{
                    p: 4,
                    height: "100px",
                    margin: "0 auto",
                    width: "380px",
                    marginTop: "10px",
                    borderRadius: "20px",
                    background: "#CEFFEC",
                    boxShadow: "20px 15px 28.4px -1px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#0A5839",
                      textAlign: "center",
                      fontFamily: "Inter",
                      fontSize: "24px",
                      fontWeight: 800,
                      lineHeight: "normal",
                    }}
                  >
                    {plan.price}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Growth;
