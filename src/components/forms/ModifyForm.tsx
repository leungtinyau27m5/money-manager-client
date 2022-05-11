import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  styled,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TransRow } from "src/data/transactions/transaction.atom";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MyStyledTextField } from "./MyTextField";
import { MyStyledSelect } from "./MySelect";
import { useEffect, useMemo, useState } from "react";
import TypesSelection from "../drawer/TypesSelection";
import { expenseTypes, incomeTypes, ItemTypes } from "src/constants/types";
import Calculator from "../calculator";
import { formatCurrencyWithPlaces } from "src/helpers/common";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { ModifySubmitCallback } from "../dialogs/TranModifyPanel";

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
  const { data, modifySubmitCallback, defaultDate } = props;
  const { control, handleSubmit, watch, setValue } = useForm<ModifyFormState>();
  const typeWatch = watch("type", data.type);
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [showCaltor, setShowCaltor] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleTypeSelect = (type: ItemTypes) => {
    setValue("title", type.text);
    setValue("iconKey", type.icon);
  };

  const handleResult = (value: string) => {
    const currency = formatCurrencyWithPlaces(Number(value), 2);
    setValue("money", currency);
  };

  const handleOnDelete = () => {
    modifySubmitCallback("delete", data);
    setShowConfirmDelete(false);
  };

  const handleOnSubmit: SubmitHandler<ModifyFormState> = (evt) => {
    const { date, ...restEvt } = evt;
    modifySubmitCallback("update", {
      ...restEvt,
      id: data.id,
      date: date.getDate(),
    });
  };

  useEffect(() => {
    if (data.type !== typeWatch) setValue("title", "");
  }, [data.type, setValue, typeWatch]);

  return (
    <StyledForm component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Box className="row-item">
        <Box className="item-title">收支</Box>
        <Box className="item-field">
          <Controller
            control={control}
            name="type"
            defaultValue={data.type}
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
              defaultValue={defaultDate}
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
            defaultValue={data.title}
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
            defaultValue={data.iconKey}
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
            defaultValue={data.money}
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
            defaultValue={data.note}
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
        sx={{
          display: "flex",
          mt: 2,
          justifyContent: "center",
          columnGap: 2.5,
        }}
      >
        <Button
          variant="text"
          sx={{ flex: 1, py: 1, maxWidth: 220 }}
          onClick={() => setShowConfirmDelete(true)}
        >
          <DeleteForeverRoundedIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ flex: 1, py: 1, maxWidth: 220 }}
          type="submit"
          color="secondary"
        >
          確定
        </Button>
      </Box>
      <TypesSelection
        open={showTypeSelection}
        onClose={() => setShowTypeSelection(false)}
        itemList={typeWatch === "expense" ? expenseTypes : incomeTypes}
        handleTypeSelect={handleTypeSelect}
      />
      <Calculator
        open={showCaltor}
        onClose={() => setShowCaltor(false)}
        handleResult={handleResult}
      />
      <Dialog
        fullWidth
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
      >
        <DialogTitle>刪除</DialogTitle>
        <DialogContent>確認需要刪除此記錄?</DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            取消
          </Button>
          <Button variant="contained" onClick={handleOnDelete}>
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </StyledForm>
  );
};

export interface ModifyFormState {
  date: Date;
  title: string;
  type: "expense" | "income";
  iconKey: string;
  money: string;
  note: string;
}

export interface ModifyFormProps {
  data: TransRow;
  modifySubmitCallback: ModifySubmitCallback;
  defaultDate: Date;
}

export default ModifyForm;
