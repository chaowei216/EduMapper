import { Typography } from "@mui/material";
import Growth from "../HomePage/Growth/Growth";

export default function Package() {
  return (
    <div>
      <Typography
        mt={1}
        p={0}
        style={{
          color: "#034F75",
          fontFamily: "Inter",
          fontSize: "45px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        }}
        variant="h5"
        gutterBottom
        textAlign={"center"}
      >
        Chọn gói học tập
      </Typography>
      <Typography
        p={0}
        mt={3}
        style={{
          color: "#034F75",
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: "27px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
        variant="h4"
        gutterBottom
        textAlign={"center"}
      >
        Lựa chọn các gói tốt nhất
      </Typography>
      <Growth />
    </div>
  );
}
