import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthProvider.jsx";

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      custom: 1630,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <ChakraProvider>
        <ThemeProvider theme={muiTheme}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </ChakraProvider>
    </StrictMode>
  </Provider>
);
