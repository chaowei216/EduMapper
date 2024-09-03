import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInCard from "../SignIn/SignInCard";
import Content from "../Content";

export default function SignInSide() {
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
            gap: { xs: 6, sm: 12 },
            height: { xs: "100%" },
            p: 2,
          }}
        >
          <Content src={"/img/imageLogin.png"} />
          <SignInCard />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
