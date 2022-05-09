import { createTheme } from "@mui/material";

export default createTheme({
  pageMaxWidth: 600,
  palette: {
    primary: {
      main: "#ED5B62",
    },
    secondary: {
      main: "#0057B7",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Noto Sans TC', sans-serif",
        },
      },
    },
  },
});
