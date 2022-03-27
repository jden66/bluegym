import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import AppContext from "../core/contexts/AppContext";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import useLogin from "../effects/useLogin";

axios.defaults.baseURL = "http://localhost:3000/api";

function MyApp({ Component, pageProps }) {
  const { user } = useLogin("trainer1");
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <AppContext.Provider value={user}>
      <SnackbarProvider maxSnack={4} autoHideDuration={2000}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SnackbarProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
