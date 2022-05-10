import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useRoutes } from "react-router-dom";
import StorageProvider from "./providers/storage/StorageProvider";
import myRoutes from "./utils/router";
import theme from "./utils/theme";

const App = () => {
  const routes = useRoutes(myRoutes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={3500}
      >
        <StorageProvider>{routes}</StorageProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
