import { Box, ButtonBase, styled, Typography } from "@mui/material";
import { useState } from "react";
import YearMonthPicker from "src/components/myDatePicker/YearMonthPicker";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { addLeadingZero, toCurrency } from "src/helpers/common";
import ResponsiveTextBox from "src/components/text/ResponsiveTextBox";
import { useSetRecoilState } from "recoil";
import { dateAtom } from "src/data/date/date.atom";
import AddTransaction from "src/components/buttons/AddTransaction";
import TransCreationPanel from "src/components/dialogs/TransCreationPanel";

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

  const handleOnChange = (year: number, month: number) => {
    setDateObj({
      year,
      month,
    });
    setDateAtom(new Date(`${year}/${month + 1}`));
  };

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
          <ResponsiveTextBox str={`${toCurrency(-355587.6)}`} />
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
