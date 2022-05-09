import { useMemo, useState } from "react";
import { Box, ButtonBase, styled, Typography } from "@mui/material";
import YearMonthPicker from "src/components/myDatePicker/YearMonthPicker";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { addLeadingZero, toCurrency } from "src/helpers/common";
import ResponsiveTextBox from "src/components/text/ResponsiveTextBox";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { dateAtom } from "src/data/date/date.atom";
import AddTransaction from "src/components/buttons/AddTransaction";
import {
  TransRow,
  transSelectorByDate,
} from "src/data/transactions/transaction.atom";

const StyledDashboardPage = styled(Box)(({ theme }) => ({
  backgroundColor: "whitesmoke",
  "& > .header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    "& > .date-wrapper": {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
  },
  "& > .subtotal-board": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    padding: `${theme.spacing(1.5)} ${theme.spacing(1)}`,
    "& > *": {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column",
      position: "relative",
      "&:not(:last-of-type)": {
        "&::after": {
          content: "''",
          position: "absolute",
          top: "50%",
          right: 0,
          width: 2,
          height: "50%",
          backgroundColor: "grey",
          transform: "translateY(-50%)",
        },
      },
    },
  },
}));

const DashboardPage = () => {
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const setDateAtom = useSetRecoilState(dateAtom);
  const [dateObj, setDateObj] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const transData = useRecoilValue(
    transSelectorByDate(`${dateObj.year}-${dateObj.month}`)
  );
  const dataByDate = useMemo(() => {
    const days = new Date(dateObj.year, dateObj.month, 0).getDate();
    const data = {} as { [key: number]: TransRow[] };
    const arr = [...transData];
    for (let i = 1; i <= days; i++) {
      data[i] = [];
      const ids = arr.reduce((arr, ele, index) => {
        if (ele.date === i) arr.push(index);
        return arr;
      }, [] as number[]);
      ids.forEach((index) => {
        data[i] = data[i].concat(...arr.splice(index, 1));
      });
    }
    return data;
  }, [dateObj.month, dateObj.year, transData]);

  const handleOnChange = (year: number, month: number) => {
    setDateObj({
      year,
      month,
    });
    setDateAtom(new Date(`${year}/${month + 1}`));
  };

  console.log(dataByDate);

  return (
    <StyledDashboardPage className="page-inner has-app-bar has-bottom-nav min-scrollbar">
      <Box className="header">
        <ButtonBase
          onClick={() => setShowYearMonthPicker(true)}
          sx={{ height: "100%", justifyContent: "flex-start" }}
          className="date-wrapper"
        >
          {dateObj.year} / {addLeadingZero(dateObj.month + 1)}
          <KeyboardArrowDownRoundedIcon />
        </ButtonBase>
      </Box>
      <Box className="subtotal-board section">
        <Box
          className="income"
          sx={{ color: (theme) => theme.palette.success.main }}
        >
          <Typography variant="caption">收入</Typography>
          <ResponsiveTextBox str={`${toCurrency(397850)}`} />
        </Box>
        <Box
          className="expense"
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          <Typography variant="caption">支出</Typography>
          <ResponsiveTextBox str={`${toCurrency(392.6)}`} />
        </Box>
        <Box
          className="balance"
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          <Typography variant="caption">結餘</Typography>
          <ResponsiveTextBox str={`${toCurrency(-355551287.6)}`} />
        </Box>
      </Box>
      <YearMonthPicker
        open={showYearMonthPicker}
        onClose={() => setShowYearMonthPicker(false)}
        handleOnChange={handleOnChange}
        defaultValue={{
          year: dateObj.year,
          month: dateObj.month,
        }}
      />
      <AddTransaction />
    </StyledDashboardPage>
  );
};

export default DashboardPage;
