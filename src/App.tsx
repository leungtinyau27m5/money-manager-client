import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import StorageProvider from "./providers/storage/StorageProvider";
import myRoutes from "./utils/router";
import theme from "./utils/theme";

const App = () => {
  const routes = useRoutes(myRoutes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StorageProvider>{routes}</StorageProvider>
    </ThemeProvider>
  );
};

export default App;
