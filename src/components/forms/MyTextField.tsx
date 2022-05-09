import { filledInputClasses, styled, TextField } from "@mui/material";

export const MyStyledTextField = styled(TextField)(() => ({
  "&.transparent-bg": {
    [`& .${filledInputClasses.root}`]: {
      backgroundColor: "transparent",
    },
  },
  "&.no-label": {
    [`& .${filledInputClasses.input}`]: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
}));
