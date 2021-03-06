import { UIEvent, useMemo, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  styled,
  Typography,
  IconButton,
  alpha,
} from "@mui/material";
import YearMonthPicker from "src/components/myDatePicker/YearMonthPicker";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  addLeadingZero,
  currencyToNumber,
  formatCurrencyWithPlaces,
} from "src/helpers/common";
import ResponsiveTextBox from "src/components/text/ResponsiveTextBox";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { dateAtom } from "src/data/date/date.atom";
import {
  TransRow,
  transSelectorByDate,
} from "src/data/transactions/transaction.atom";
import DateTransaction from "src/containers/transactionContainer/DateTransaction";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { StorageCtx } from "src/providers/storage/context";
import TransCreationPanel from "src/components/dialogs/TransCreationPanel";
import TranModifyPanel from "src/components/dialogs/TranModifyPanel";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#FFCF48",
  color: "white",
  position: "fixed",
  bottom: 80,
  left: 20,
  boxShadow: "0px 0px 5px 2px rgba(15, 15, 15, 0.15)",
  "&:hover": {
    backgroundColor: alpha("#FFCF48", 0.75),
  },
  [theme.breakpoints.up("md")]: {
    left: "calc((100vw - 600px) / 2 + 20px)",
  },
}));

const StyledDashboardPage = styled(Box)(({ theme }) => ({
  backgroundColor: "whitesmoke",
  "&.scrolled": {
    "& > .header": {
      backgroundColor: "white",
    },
  },
  "& > .header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    flexDirection: "column",
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 1,
    transition: "all .3s ease-in-out",
    "& > .date-wrapper": {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    "& > .subtotal-board": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      padding: `${theme.spacing(1.5)} ${theme.spacing(1)}`,
      width: "100%",
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
  },
  "& > .data-container": {
    marginTop: theme.spacing(3.5),
    paddingLeft: 8,
    paddingRight: 8,
  },
}));

const DashboardPage = () => {
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const setDateAtom = useSetRecoilState(dateAtom);
  const [dateObj, setDateObj] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const defaultDate = useRef(new Date());
  const modifyTarget = useRef<TransRow | null>(null);
  const me = useRef<HTMLDivElement>(null);
  const transData = useRecoilValue(
    transSelectorByDate(`${dateObj.year}-${dateObj.month}`)
  );
  const totalIncome = useMemo(() => {
    return Object.values(transData).reduce((total, ele) => {
      ele.forEach((item) => {
        if (item.type === "income") total += currencyToNumber(item.money);
      });
      return total;
    }, 0);
  }, [transData]);
  const totalExpense = useMemo(() => {
    return Object.values(transData).reduce((total, ele) => {
      ele.forEach((item) => {
        if (item.type === "expense") total += currencyToNumber(item.money);
      });
      return total;
    }, 0);
  }, [transData]);

  const handleOnChange = (year: number, month: number) => {
    setDateObj({
      year,
      month,
    });
    setDateAtom(new Date(`${year}/${month + 1}`));
  };

  const toggleCreationByDate = (date: Date) => {
    defaultDate.current = date;
    setShowPanel(true);
  };

  const handleTransactionOnClick = (data: TransRow) => {
    modifyTarget.current = data;
    setShowModify(true);
  };

  const handleScroll = (evt: UIEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLDivElement;
    if (target.scrollTop > 50) {
      target.classList.add("scrolled");
    } else {
      target.classList.remove("scrolled");
    }
  };

  return (
    <StyledDashboardPage
      className="page-inner has-app-bar has-bottom-nav min-scrollbar"
      ref={me}
      onScroll={handleScroll}
    >
      <Box className="header">
        <ButtonBase
          onClick={() => setShowYearMonthPicker(true)}
          sx={{
            height: "100%",
            justifyContent: "flex-start",
            alignSelf: "flex-start",
          }}
          className="date-wrapper"
        >
          {dateObj.year} / {addLeadingZero(dateObj.month + 1)}
          <KeyboardArrowDownRoundedIcon />
        </ButtonBase>
        <Box className="subtotal-board section">
          <Box
            className="income"
            sx={{ color: (theme) => theme.palette.success.main }}
          >
            <Typography variant="caption">??????</Typography>
            <ResponsiveTextBox
              str={`$${formatCurrencyWithPlaces(totalIncome)}`}
            />
          </Box>
          <Box
            className="expense"
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            <Typography variant="caption">??????</Typography>
            <ResponsiveTextBox
              str={`$${formatCurrencyWithPlaces(totalExpense)}`}
            />
          </Box>
          <Box
            className="balance"
            sx={{
              color: (theme) =>
                totalIncome - totalExpense >= 0
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
          >
            <Typography variant="caption">??????</Typography>
            <ResponsiveTextBox
              str={`$${formatCurrencyWithPlaces(totalIncome - totalExpense)}`}
            />
          </Box>
        </Box>
      </Box>
      <Box className="data-container">
        {Object.entries(transData).map(
          ([key, value]) =>
            value.length > 0 && (
              <DateTransaction
                key={key}
                year={dateObj.year}
                month={dateObj.month}
                date={key}
                rows={value}
                toggleCreationByDate={toggleCreationByDate}
                handleTransactionOnClick={handleTransactionOnClick}
              />
            )
        )}
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
      <StyledIconButton size="large" onClick={() => setShowPanel(true)}>
        <AddRoundedIcon />
      </StyledIconButton>
      <StorageCtx.Consumer>
        {({ addItems }) => (
          <TransCreationPanel
            open={showPanel}
            addItems={addItems}
            onClose={() => setShowPanel(false)}
            defaultDate={defaultDate.current}
          />
        )}
      </StorageCtx.Consumer>
      <StorageCtx.Consumer>
        {({ updateItems, removeItems }) => (
          <TranModifyPanel
            updateItems={updateItems}
            removeItems={removeItems}
            open={showModify}
            onClose={() => setShowModify(false)}
            target={modifyTarget.current}
            currentKey={`${dateObj.year}-${dateObj.month}`}
          />
        )}
      </StorageCtx.Consumer>
    </StyledDashboardPage>
  );
};

export default DashboardPage;
