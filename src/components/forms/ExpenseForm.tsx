import { Box, styled, Typography, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MyStyledTextField } from "./MyTextField";

const StyledForm = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: 12,
  rowGap: 8,
  "& > .row-item": {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "80px 1fr",
    alignItems: "center",
    "& > div": {},
    "& > .item-title": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& > .item-field": {
      flex: 1,
      justifyContent: "center",
      height: "100%",
      "& > *": {
        width: "100%",
      },
    },
  },
}));

const ExpenseForm = () => {
  const { control } = useForm();
  return (
    <StyledForm component="form">
      <Box className="row-item">
        <Box className="item-title">
          <Typography>日期</Typography>
        </Box>
        <Box className="item-field">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              control={control}
              name="date"
              defaultValue={new Date()}
              render={({ field }) => (
                <MobileDatePicker
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <MyStyledTextField
                      {...params}
                      variant="filled"
                      className="no-label"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box className="row-item">
        <Box className="item-title">種類</Box>
        <Box className="item-field">
          <Controller
            control={control}
            name="type"
            defaultValue=""
            render={({ field }) => (
              <MyStyledTextField
                {...field}
                variant="filled"
                disabled={true}
                className="no-label"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Box className="row-item">
        <Box className="item-title">合計</Box>
        <Box className="item-field">
          <Controller
            control={control}
            name="money"
            defaultValue=""
            render={({ field }) => (
              <MyStyledTextField
                {...field}
                variant="filled"
                className="no-label"
                disabled={true}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Box className="row-item">
        <Box className="item-title">備錄</Box>
        <Box className="item-field">
          <Controller
            control={control}
            name="note"
            defaultValue=""
            render={({ field }) => (
              <MyStyledTextField
                {...field}
                variant="filled"
                className="no-label"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            )}
          />
        </Box>
      </Box>
    </StyledForm>
  );
};

export interface ExpenseFormState {}

export interface ExpenseFormProps {}

export default ExpenseForm;
