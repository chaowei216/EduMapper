import {
  Box,
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
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { GetAllMemberShip } from "../../../../api/MemberShipApi";
import { formatPrice } from "../../../../utils/FormatPrice";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";

const Growth = () => {
  // Sử dụng useQuery để gọi API và quản lý cache
  const navigate = useNavigate();
  const {
    data: memberShip,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allMemberships"], // Key để quản lý cache
    queryFn: () =>
      GetAllMemberShip("", "").then((res) => {
        if (!res.ok) {
          throw new Error("Error getting membership");
        }
        return res.json();
      }),
    staleTime: 300000, // Cache dữ liệu trong 5 phút
    onError: () => {
      toast.error("Error getting membership data");
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <InventoryIcon />
        Không có dữ liệu
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <InventoryIcon />
        Lỗi
      </div>
    );
  }

  const handleBuyMemberShip = (item) => {
    const memberShip = item;
    navigate("/payment", { state: memberShip });
  };

  return (
    <div className={styles.package_container}>
      <div className={styles.package_content}>
        <Box pt={3} style={{ background: "#66D4A9", borderRadius: "15px" }}>
          <Grid
            container
            sx={{
              "@media (max-width: 1654px)": {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            }}
          >
            {memberShip?.metaData.map((plan, index) => (
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
                      fontWeight: 800,
                      marginBottom: "40px",
                    }}
                    variant="h5"
                    gutterBottom
                    textAlign={"center"}
                  >
                    {plan.memberShipName}
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
                    {plan.noFeatures &&
                      plan.noFeatures.length > 0 &&
                      plan.noFeatures.map((item, index) => (
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
                <div style={{ cursor: "pointer" }} onClick={() => handleBuyMemberShip(plan)}>
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
                      }}
                    >
                      {formatPrice(plan.price)}
                    </Typography>
                  </Paper>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Growth;
