import { Box, MenuItem, styled } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TransRow } from "src/data/transactions/transaction.atom";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MyStyledTextField } from "./MyTextField";
import { MyStyledSelect } from "./MySelect";

const StyledForm = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: 12,
  rowGap: 8,
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.pageMaxWidth,
    marginLeft: "auto",
    marginRight: "auto",
  },
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

const ModifyForm = (props: ModifyFormProps) => {
  const { defaultDate, data } = props;
  const { control, handleSubmit } = useForm();
  return (
    <StyledForm component="form">
      <Box className="row-item">
        <Box className="item-title">收支</Box>
        <Box className="item-field">
          <Controller
            control={control}
            name="type"
            defaultValue={data?.type || "expense"}
            rules={{
              required: true,
            }}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <MyStyledSelect
                {...field}
                variant="filled"
                className="no-label"
                error={error !== undefined}
                disableUnderline={true}
                sx={{
                  color: "white",
                  backgroundColor: (theme) =>
                    (field.value === "expense"
                      ? theme.palette.error.light
                      : theme.palette.success.light) + " !important",
                  "& svg": {
                    color: "white",
                  },
                }}
                inputRef={ref}
              >
                <MenuItem value="expense">支出</MenuItem>
                <MenuItem value="income">收入</MenuItem>
              </MyStyledSelect>
            )}
          />
        </Box>
      </Box>
      <Box className="row-item">
        <Box className="item-title">日期</Box>
        <Box className="item-field">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              control={control}
              name="date"
              defaultValue={defaultDate || new Date()}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }) => (
                <MobileDatePicker
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  maxDate={new Date()}
                  renderInput={(params) => (
                    <MyStyledTextField
                      {...params}
                      variant="filled"
                      className="no-label"
                      error={error !== undefined}
                      helperText={error ? "Required" : ""}
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
        <Box className="item-field"></Box>
      </Box>
    </StyledForm>
  );
};

export interface ModifyFormState {
  data: string;
  type: "expense" | "income";
}

export interface ModifyFormProps {
  defaultDate?: Date;
  data?: TransRow;
}

export default ModifyForm;
