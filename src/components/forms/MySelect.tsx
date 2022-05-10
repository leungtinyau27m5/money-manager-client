import { filledInputClasses, Select, styled } from "@mui/material";

export const MyStyledSelect = styled(Select)(() => ({
  "&.no-label": {
    [`& .${filledInputClasses.input}`]: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
}));
