import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const testList = [
  {
    id: 1,
    title: "IELTS Simulation Listening test 1",
    time: "40 phút",
    views: 660930,
    questions: 2029,
    tags: ["IELTS Academic", "Listening"],
    parts: 4,
    totalQuestions: 40,
  },
  {
    id: 2,
    title: "IELTS Simulation Listening test 2",
    time: "40 phút",
    views: 265839,
    questions: 556,
    tags: ["IELTS Academic", "Listening"],
    parts: 4,
    totalQuestions: 40,
  },
  {
    id: 2,
    title: "IELTS Simulation Listening test 2",
    time: "40 phút",
    views: 265839,
    questions: 556,
    tags: ["IELTS Academic", "Listening"],
    parts: 4,
    totalQuestions: 40,
  },
  {
    id: 2,
    title: "IELTS Simulation Listening test 2",
    time: "40 phút",
    views: 265839,
    questions: 556,
    tags: ["IELTS Academic", "Listening"],
    parts: 4,
    totalQuestions: 40,
  },
  {
    id: 2,
    title: "IELTS Simulation Listening test 2",
    time: "40 phút",
    views: 265839,
    questions: 556,
    tags: ["IELTS Academic", "Listening"],
    parts: 4,
    totalQuestions: 40,
  },
  {
    id: 2,
    title: "IELTS Simulation Listening test 2",
    time: "40 phút",
    views: 265839,
    questions: 556,
    tags: ["IELTS Academic", "Listening"],
    parts: 4,
    totalQuestions: 40,
  },
  // Thêm các bài thi khác vào đây
];

export default function TestList() {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredTests = selectedType
    ? testList.filter((test) => test.type === selectedType)
    : testList;

  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: 4 }}>
        <div className="flex gap-4 mb-4">
          <Typography variant="h4" mt={1}>Thư viện đề thi</Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="select-test-type-label">Loại đề thi</InputLabel>
            <Select
              labelId="select-test-type-label"
              value={selectedType}
              onChange={handleTypeChange}
              label="Loại đề thi"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="IELTS">IELTS</MenuItem>
              <MenuItem value="TOEIC">TOEIC</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={2}>
          {testList.map((test) => (
            <Grid item xs={12} sm={6} md={3} key={test.id}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {test.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{test.time}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <GroupIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {test.views.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <ChatBubbleIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{test.questions}</Typography>
                  </Box>
                  <Typography variant="body2">
                    {test.parts} phần thi | {test.totalQuestions} câu hỏi
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    {test.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={`#${tag}`}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                  <Button variant="outlined" size="small">
                    Chi tiết
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
