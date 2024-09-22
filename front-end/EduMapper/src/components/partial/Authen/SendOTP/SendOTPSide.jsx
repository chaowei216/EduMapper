import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Content from "../Content";
import SendOTP from "./sendOTP";

export default function SendOTPSide() {
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Stack direction="column" component="main">
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            height: { xs: "100%" },
            p: 2,
          }}
        >
          <Content src={"/img/OTP.jpg"} />
          <SendOTP />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
