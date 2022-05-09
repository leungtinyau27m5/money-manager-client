import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import myRoutes from "./utils/router";
import theme from "./utils/theme";

const App = () => {
  const routes = useRoutes(myRoutes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {routes}
    </ThemeProvider>
  );
};

export default App;
