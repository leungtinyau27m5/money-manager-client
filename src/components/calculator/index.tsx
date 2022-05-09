import {
  Box,
  styled,
  Dialog,
  dialogClasses,
  paperClasses,
  ButtonBase,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { MyStyledTextField } from "../forms/MyTextField";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const StyledDialog = styled(Dialog)(() => ({
  [`& .${dialogClasses.container}`]: {
    alignItems: "flex-end",
    [`& .${paperClasses.root}`]: {
      width: "100%",
      margin: 0,
    },
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.pageMaxWidth,
    marginLeft: "auto",
    marginRight: "auto",
  },
  "& .cal-result": {
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
  },
  "& .cal-keyboard": {
    display: "grid",
    height: "40vh",
    maxHeight: 600,
    width: "100%",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    backgroundColor: "#0C2635",
    "& > button": {
      fontSize: "1.2rem",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      borderCollapse: "collapse",
      color: "white",
    },
  },
}));

const Calculator = (props: CalculatorProps) => {
  const { open, onClose, handleResult } = props;
  const { control, setValue, getValues, watch } = useForm<CalculatorState>();
  const formulaWatch = watch("formula", "");

  const handleNumberKey = (val: string) => {
    const newValues = getValues("formula");
    setValue("formula", newValues + val);
  };

  const resetValues = () => {
    setValue("formula", "");
    setValue("result", "");
  };

  const handleOperation = (symbol: "*" | "/" | "-" | "+") => {
    const newValues = getValues("formula");
    if (newValues.match(/[*\-+/]\s$/)) return;
    setValue("formula", `${newValues} ${symbol} `);
  };

  const handleReduceCal = (a: string[]): string[] => {
    if (a.includes("/")) {
      const idx = a.findIndex((ele) => ele === "/");
      const first = Number(a[idx - 1]);
      const second = Number(a[idx + 1]);
      if (second === 0) {
        a[idx - 1] = "0";
      } else {
        const temp = first % second !== 0 ? first / second : first / second;
        a[idx - 1] = temp.toString();
      }
      a.splice(idx, 2);
    }
    if (a.includes("*")) {
      const idx = a.findIndex((ele) => ele === "*");
      const first = Number(a[idx - 1]);
      const second = Number(a[idx + 1]);
      const temp = first * second;
      a[idx - 1] = temp.toString();
      a.splice(idx, 2);
    }
    if (a.includes("+")) {
      const idx = a.findIndex((ele) => ele === "+");
      const first = Number(a[idx - 1]);
      const second = Number(a[idx + 1]);
      const temp = first + second;
      a[idx - 1] = temp.toString();
      a.splice(idx, 2);
    }
    if (a.includes("-")) {
      const idx = a.findIndex((ele) => ele === "-");
      const first = Number(a[idx - 1]);
      const second = Number(a[idx + 1]);
      const temp = first - second;
      a[idx - 1] = temp.toString();
      a.splice(idx, 2);
    }
    return a.length === 1 ? a : handleReduceCal(a);
  };

  const handleSubmit = () => {
    const formula = getValues("formula");
    if (formula.match(/[*\-+/]/)) {
      const arr = formula.split(" ");
      if (arr[0] === "") arr.shift();
      if (arr[arr.length - 1] === "") arr.pop();
      const value = handleReduceCal(arr);
      setValue("result", value[0]);
    } else {
      if (formula === "") {
        handleResult(getValues("result"));
      } else {
        handleResult(formula);
      }
      onClose();
    }
    setValue("formula", "");
  };

  return (
    <StyledDialog open={open} onClose={() => onClose()}>
      <StyledBox>
        <Box className="cal-result">
          <Controller
            control={control}
            name="formula"
            defaultValue=""
            render={({ field }) => (
              <MyStyledTextField
                variant="filled"
                className="no-label transparent-bg"
                disabled={true}
                InputProps={{
                  disableUnderline: true,
                }}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="result"
            defaultValue=""
            render={({ field }) => (
              <MyStyledTextField
                variant="filled"
                className="no-label transparent-bg"
                disabled={true}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  style: {
                    textAlign: "right",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "darkgrey",
                  },
                }}
                {...field}
              />
            )}
          />
        </Box>
        <Box className="cal-keyboard">
          <ButtonBase
            sx={{
              gridColumnEnd: "span 2",
              backgroundColor: (theme) => theme.palette.secondary.main,
            }}
            onClick={resetValues}
          >
            C
          </ButtonBase>
          <ButtonBase onClick={() => handleOperation("/")}>/</ButtonBase>
          <ButtonBase onClick={() => handleOperation("*")}>*</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("7")}>7</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("8")}>8</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("9")}>9</ButtonBase>
          <ButtonBase onClick={() => handleOperation("-")}>-</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("4")}>4</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("5")}>5</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("6")}>6</ButtonBase>
          <ButtonBase
            sx={{ gridRowEnd: "span 2" }}
            onClick={() => handleOperation("+")}
          >
            +
          </ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("1")}>1</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("2")}>2</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("3")}>3</ButtonBase>
          <ButtonBase onClick={() => handleNumberKey("0")}>0</ButtonBase>
          <ButtonBase>.</ButtonBase>
          <ButtonBase
            sx={{
              gridColumnEnd: "span 2",
              backgroundColor: (theme) => theme.palette.primary.main,
            }}
            onClick={handleSubmit}
          >
            {formulaWatch && formulaWatch.match(/[*\-+/]/) ? (
              "="
            ) : (
              <CheckCircleOutlineRoundedIcon />
            )}
          </ButtonBase>
        </Box>
      </StyledBox>
    </StyledDialog>
  );
};

export interface CalculatorState {
  formula: string;
  result: string;
}

export interface CalculatorProps {
  open: boolean;
  handleResult: (value: string) => void;
  onClose: () => void;
}

export default Calculator;
