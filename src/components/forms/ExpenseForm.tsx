import { Box, styled, Typography, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MyStyledTextField } from "./MyTextField";
import TypesSection from "src/drawer/TypesSelection";
import { useState } from "react";
import { expenseTypes } from "src/constants/types";

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
  const { control, setValue } = useForm<ExpenseFormState>();
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  return (
    <StyledForm component="form">
      <Box className="row-item">
        <Box className="item-title">日期</Box>
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
                onClick={() => setShowTypeSelection(true)}
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
      <TypesSection
        open={showTypeSelection}
        onClose={() => setShowTypeSelection(false)}
        itemList={expenseTypes}
      />
    </StyledForm>
  );
};

export interface ExpenseFormState {
  date: Date;
  type: string;
  money: string;
  note: string;
}

export interface ExpenseFormProps {}

export default ExpenseForm;
