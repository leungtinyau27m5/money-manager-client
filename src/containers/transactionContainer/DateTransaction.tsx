import { Box, ListItemButton, styled } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import Transaction from "src/components/catalog/Transaction";
import { TransRow } from "src/data/transactions/transaction.atom";
import {
  addLeadingZero,
  currencyToNumber,
  dayName,
  formatCurrencyWithPlaces,
} from "src/helpers/common";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& .trans-board-head": {
    padding: "4px 2px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid rgba(200, 200, 200, 0.75)",
    "& > span": {
      fontSize: 12,
      flexGrow: 1,
      transform: `scale(${11 / 12})`,
    },
  },
  "& .trans-board-body": {
    display: "flex",
    flexDirection: "column",
    padding: "4px 12px",
    "& > .transaction-item": {
      "&:not(:last-of-type)": {},
    },
  },
}));

const DateTransaction = (props: DateTransactionProps) => {
  const {
    rows,
    date,
    month,
    year,
    toggleCreationByDate,
    handleTransactionOnClick,
  } = props;
  const day = dayName[new Date(year, month, Number(date)).getDay()];

  const totalIncome = useMemo(() => {
    return rows.reduce((total, ele) => {
      if (ele.type === "income") total += currencyToNumber(ele.money);
      return total;
    }, 0);
  }, [rows]);

  const totalExpense = useMemo(() => {
    return rows.reduce((total, ele) => {
      if (ele.type === "expense") total += currencyToNumber(ele.money);
      return total;
    }, 0);
  }, [rows]);

  const handleOnClick = () => {
    toggleCreationByDate(new Date(year, month, Number(date)));
  };

  return (
    <StyledBox className="date-transaction-outer section">
      <ListItemButton className="trans-board-head" onClick={handleOnClick}>
        <Box component="span">
          {addLeadingZero(month + 1)}/{addLeadingZero(+date)}
          &nbsp;&nbsp;
          {day}
        </Box>
        <Box
          component="span"
          sx={{
            textAlign: "center",
            color: (theme) => theme.palette.success.main,
          }}
        >
          收入: ${formatCurrencyWithPlaces(totalIncome)}
        </Box>
        <Box
          component="span"
          sx={{
            textAlign: "right",
            color: (theme) => theme.palette.error.main,
          }}
        >
          支出: ${formatCurrencyWithPlaces(totalExpense)}
        </Box>
      </ListItemButton>
      <Box className="trans-board-body">
        {rows.map((ele) => (
          <Transaction
            key={ele.id}
            data={ele}
            handleTransactionOnClick={handleTransactionOnClick}
          />
        ))}
      </Box>
      <Box className="trans-board-trailing"></Box>
    </StyledBox>
  );
};

export interface DateTransactionProps {
  rows: TransRow[];
  year: number;
  month: number;
  date: string;
  toggleCreationByDate: (date: Date) => void;
  handleTransactionOnClick: (data: TransRow) => void;
}

export default DateTransaction;
