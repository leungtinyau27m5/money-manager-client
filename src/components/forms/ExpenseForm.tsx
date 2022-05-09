import { useEffect, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MyStyledTextField } from "./MyTextField";
import TypesSection from "src/drawer/TypesSelection";
import { expenseTypes, ItemTypes } from "src/constants/types";
import Calculator from "src/components/calculator";
import { formatCurrencyWithPlaces } from "src/helpers/common";
import { SubmitCallbackHandler } from "../dialogs/TransCreationPanel";

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

const ExpenseForm = (props: ExpenseFormProps) => {
  const { submitCallback } = props;
  const { control, setValue, handleSubmit } = useForm<ExpenseFormState>();
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [showCaltor, setShowCaltor] = useState(false);

  const handleResult = (value: string) => {
    const currency = formatCurrencyWithPlaces(Number(value), 2);
    setValue("money", currency);
  };

  const handleTypeSelect = (type: ItemTypes) => {
    setValue("title", type.text);
    setValue("iconKey", type.key);
  };

  const handleFormSubmit: SubmitHandler<ExpenseFormState> = (evt) => {
    submitCallback({
      ...evt,
      type: "expense",
    });
  };

  return (
    <StyledForm component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Box className="row-item">
        <Box className="item-title">日期</Box>
        <Box className="item-field">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              control={control}
              name="date"
              defaultValue={new Date()}
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
        <Box className="item-field">
          <Controller
            control={control}
            name="title"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <MyStyledTextField
                {...field}
                variant="filled"
                disabled={true}
                className="no-label"
                onClick={() => setShowTypeSelection(true)}
                InputProps={{
                  disableUnderline: true,
                }}
                error={error !== undefined}
                helperText={error ? "Required" : ""}
              />
            )}
          />
          <Controller
            control={control}
            name="iconKey"
            defaultValue=""
            render={({ field }) => (
              <MyStyledTextField
                {...field}
                variant="filled"
                type="hidden"
                sx={{ display: "none" }}
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
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <MyStyledTextField
                {...field}
                variant="filled"
                className="no-label"
                disabled={true}
                onClick={() => setShowCaltor(true)}
                error={error !== undefined}
                helperText={error ? "Required" : ""}
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
                multiline
                maxRows={5}
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="Max 100 Characters"
                sx={{
                  "& .MuiFilledInput-root": {
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Box
        className="action-row"
        sx={{ display: "flex", mt: 2, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          sx={{ flex: 1, py: 1, maxWidth: 220 }}
          type="submit"
        >
          確定
        </Button>
      </Box>
      <TypesSection
        open={showTypeSelection}
        onClose={() => setShowTypeSelection(false)}
        itemList={expenseTypes}
        handleTypeSelect={handleTypeSelect}
      />
      <Calculator
        open={showCaltor}
        onClose={() => setShowCaltor(false)}
        handleResult={handleResult}
      />
    </StyledForm>
  );
};

export interface ExpenseFormState {
  date: Date;
  title: string;
  iconKey: string;
  money: string;
  note: string;
}

export interface ExpenseFormProps {
  submitCallback: SubmitCallbackHandler;
}

export default ExpenseForm;
