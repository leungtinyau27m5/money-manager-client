import { useState, useRef, useEffect } from "react";
import {
  Box,
  ButtonBase,
  Drawer,
  paperClasses,
  styled,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import clsx from "clsx";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [`& .${paperClasses.root}`]: {
    "& > .year-wrapper": {
      display: "flex",
      "& > *": {
        paddingTop: 4,
        paddingBottom: 4,
        flexGrow: 1,
      },
    },
    "& > .month-wrapper": {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gridTemplateRows: "repeat(2, 45px)",
      "& .month-item": {
        transition: "all .3s ease-in-out",
        "&.active": {
          color: "white",
          backgroundColor: theme.palette.primary.light,
        },
      },
    },
    "& button": {
      "&.Mui-disabled": {
        color: "grey",
        opacity: 0.5,
      },
    },
  },
}));

const YearMonthPicker = (props: YearMonthPickerProps) => {
  const { open, onClose, handleOnChange, defaultValue } = props;
  const today = useRef(new Date());
  const [date, setDate] = useState(new Date());

  const nextYear = () => {
    setDate((state) => {
      const newState = new Date(state);
      newState.setFullYear(newState.getFullYear() + 1);
      if (newState.getFullYear() === today.current.getFullYear()) {
        newState.setMonth(today.current.getMonth());
      } else {
        newState.setMonth(0);
      }
      return newState;
    });
  };

  const prevYear = () => {
    setDate((state) => {
      const newState = new Date(state);
      newState.setFullYear(newState.getFullYear() - 1);
      if (newState.getFullYear() === today.current.getFullYear()) {
        newState.setMonth(today.current.getMonth());
      } else {
        newState.setMonth(0);
      }
      return newState;
    });
  };

  const handleMonthChange = (index: number) => {
    handleOnChange(date.getFullYear(), index);
    setDate((state) => {
      const newState = new Date(state);
      newState.setMonth(index);
      return newState;
    });
    onClose();
  };

  return (
    <StyledDrawer open={open} anchor="top" onClose={() => onClose()}>
      <Box className="year-wrapper">
        <ButtonBase onClick={prevYear}>
          <ArrowBackIosNewRoundedIcon />
        </ButtonBase>
        <Box>
          <Typography variant="h6" align="center">
            {date.getFullYear()}
          </Typography>
        </Box>
        <ButtonBase
          onClick={nextYear}
          disabled={date.getFullYear() + 1 > today.current.getFullYear()}
        >
          <ArrowForwardIosRoundedIcon />
        </ButtonBase>
      </Box>
      <Box className="month-wrapper">
        {Array(12)
          .fill(1)
          .map((_, index) => (
            <ButtonBase
              key={`month-${index}`}
              className={clsx("month-item", {
                active: date.getMonth() === index,
              })}
              disabled={
                date.getFullYear() === today.current.getFullYear() &&
                index > today.current.getMonth()
              }
              onClick={() => handleMonthChange(index)}
            >
              {index + 1}月
            </ButtonBase>
          ))}
      </Box>
    </StyledDrawer>
  );
};

export interface YearMonthPickerProps {
  open: boolean;
  onClose: () => void;
  handleOnChange: (year: number, month: number) => void;
  defaultValue: {
    year: number;
    month: number;
  };
}

export default YearMonthPicker;
