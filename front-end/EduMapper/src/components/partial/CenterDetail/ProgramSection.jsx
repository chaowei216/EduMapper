import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const programs = [
  {
    title: "Tiếng anh bắt đầu (3-6 tuổi)",
    description: [
      "Hình thành phản xạ ngôn ngữ và cách diễn đạt tự nhiên với phát âm chuẩn trong các đoạn hội thoại đơn giản.",
      "Con nhận biết âm và đọc được từ đơn. Con nói được cả câu hoàn chỉnh, ngoài ra có thể chủ động tự viết chữ cái.",
    ],
  },
  {
    title: "Tiếng anh thiếu nhi (6-10 tuổi)",
    description: [
      "Con tự tin giao tiếp trôi chảy bằng tiếng Anh, chủ động nhận biết và hoàn thiện các ngôn ngữ ngôn từ.",
      "Con thành thạo các kỹ năng tiếng Anh và viết bằng ngôn ngữ tự do, chuẩn bị cho các kỳ thi quốc tế phù hợp lứa tuổi.",
    ],
  },
  // Add more programs as needed
];

const ProgramSection = () => (
  <Box>
    <Typography variant="h6" color="green" gutterBottom>
      Chương trình đào tạo
    </Typography>
    {programs.map((program, index) => (
      <Box key={index} mb={3}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {program.title}
        </Typography>
        <List>
          {program.description.map((desc, i) => (
            <ListItem key={i}>
              <ListItemIcon>
                <CheckIcon style={{ color: "green" }} />
              </ListItemIcon>
              <ListItemText primary={desc} />
            </ListItem>
          ))}
        </List>
      </Box>
    ))}
  </Box>
);

export default ProgramSection;
