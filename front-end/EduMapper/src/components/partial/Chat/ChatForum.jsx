import { useEffect, useState, useRef } from "react"; // Thêm useRef
import * as signalR from "@microsoft/signalr";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Container,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useAuth from "../../../hooks/useAuth";
import { GetAllChat } from "../../../api/ChatApi";
import { ConnectToSignalR } from "../../../api/HubChat";

export default function ChatForum() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const { user } = useAuth();
  // Tạo một ref để tham chiếu đến khung hiển thị tin nhắn
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const newConnection = ConnectToSignalR();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await GetAllChat();
      const data = await response.json();
      console.log(data);

      setMessages(data.metaData);
    };

    fetchMessages();

    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR");

          connection.on(
            "ReceiveMessage",
            (messageId, userName, content, createdDate) => {
              // Kiểm tra xem tin nhắn đã tồn tại chưa
              setMessages((prevMessages) => {
                const existingMessage = prevMessages.find(
                  (msg) => msg.messageId === messageId
                );
                if (!existingMessage) {
                  return [
                    ...prevMessages,
                    { messageId, userName, content, createdDate },
                  ];
                }
                return prevMessages; // Không thêm nếu đã tồn tại
              });
            }
          );

          connection.on("MessageDeleted", (messageId) => {
            setMessages((prevMessages) =>
              prevMessages.filter((msg) => msg.messageId !== messageId)
            );
          });

          connection.on("MessageUpdated", (messageId, newContent) => {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.messageId === messageId
                  ? { ...msg, content: newContent }
                  : msg
              )
            );
          });

          connection.on("ReceiveError", (errorMessage) => {
            alert(errorMessage);
          });
        })
        .catch((error) => console.log("Error connecting to SignalR:", error));
    }
  }, [connection]);

  useEffect(() => {
    // Cuộn xuống cuối cùng khi có tin nhắn mới
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Chạy mỗi khi messages thay đổi

  const sendMessage = async () => {
    if (connection && message) {
      try {
        await connection.invoke("SendMessage", user?.id, message);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const deleteMessage = async (messageId) => {
    if (connection) {
      try {
        await connection.invoke("DeleteMessage", messageId, user?.id);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const updateMessage = async () => {
    if (editingMessageId && connection) {
      try {
        await connection.invoke(
          "UpdateMessage",
          user?.id,
          editingMessageId,
          message
        );
        setEditingMessageId(null);
        setMessage("");
      } catch (error) {
        console.error("Error updating message:", error);
      }
    }
  };

  const handleEditClick = (msg) => {
    setEditingMessageId(msg.messageId);
    setMessage(msg.content);
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Cộng động chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          margin: "auto",
          marginTop: 4,
          height: "75vh",
          width: "90rem",
        }}
      >
        <Box sx={{ height: "63vh", overflowY: "auto", marginBottom: 2 }}>
          {" "}
          {/* Tăng chiều cao khung hiển thị */}
          <List>
            {messages &&
              messages.map((msg) => (
                <ListItem
                  style={{ paddingRight: "0px" }}
                  key={msg.messageId}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditClick(msg)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteMessage(msg.messageId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={msg.userName}
                      //src={'/img/avatar.png'}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{
                      background: "#dfdfdf",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                    primary={
                      <>
                        <Typography
                          variant="body1"
                          component="span"
                          fontWeight="bold"
                          marginRight={1}
                        >
                          {msg.userName + ":"}
                        </Typography>
                        <>{msg.content}</>
                      </>
                    }
                    secondary={new Date(msg.createdDate).toLocaleTimeString()}
                  />
                </ListItem>
              ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="Nhập tin nhắn"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              (editingMessageId ? updateMessage() : sendMessage())
            }
          />
          <Button
            variant="contained"
            color="primary"
            sx={{width: "115px"}}
            onClick={editingMessageId ? updateMessage : sendMessage}
          >
            {editingMessageId ? "Cập nhật" : "Gửi"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
