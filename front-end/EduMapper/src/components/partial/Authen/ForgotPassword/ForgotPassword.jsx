import { useState } from "react";
import ForgotPasswordCard from "./ForgotPasswordCard";
import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import Content from "../Content";

const ForgotPassword = () => {
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       gap: "30px",
  //     }}
  //   >
  //     <div style={{ width: "30%" }}>
  //       <LayoutForgotPassword />
  //     </div>
  //     <div
  //       style={{
  //         width: "30%",
  //       }}
  //     >
  //       <ForgotPasswordCard />
  //     </div>
  //   </div>
  // );

  const [mode, setMode] = useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Stack direction="column" component="main">
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            height: { xs: "100%" },
            p: 2,
          }}
        >
          <Content src={"/img/forgotPass.avif"} />
          <ForgotPasswordCard />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default ForgotPassword;
