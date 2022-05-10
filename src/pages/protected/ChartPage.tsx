import { useState, SyntheticEvent, useRef, useMemo } from "react";
import { Box, styled, ButtonBase, Tabs, Tab, Typography } from "@mui/material";
import {
  addLeadingZero,
  currencyToNumber,
  formatCurrencyWithPlaces,
} from "src/helpers/common";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Swiper as SwiperView, SwiperSlide } from "swiper/react";
import type { Swiper } from "swiper";
import "swiper/css";
import MyNightingaleChart from "src/components/charts/MyNightingaleChart";
import { useRecoilValue } from "recoil";
import { transSelectorByDate } from "src/data/transactions/transaction.atom";

const StyledChartPage = styled(Box)(({ theme }) => ({
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
  "& > .panel-wrapper": {
    padding: 8,
    "& .no-data-chart": {
      height: 80,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '100%'
    },
  },
}));

const ChartPage = () => {
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const [dateObj, setDateObj] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const swiperRef = useRef<Swiper | null>(null);
  const transData = useRecoilValue(
    transSelectorByDate(`${dateObj.year}-${dateObj.month}`)
  );
  const expenseRows = useMemo(() => {
    return Object.values(transData).reduce((arr, ele) => {
      ele.forEach((item) => {
        if (item.type === "expense") arr.push(item);
      });
      return arr;
    }, []);
  }, [transData]);
  const incomeRows = useMemo(() => {
    return Object.values(transData).reduce((arr, ele) => {
      ele.forEach((item) => {
        if (item.type === "income") arr.push(item);
      });
      return arr;
    }, []);
  }, [transData]);
  const totalIncome = incomeRows.reduce(
    (total, ele) => (total += currencyToNumber(ele.money)),
    0
  );
  const totalExpense = expenseRows.reduce(
    (total, ele) => (total += currencyToNumber(ele.money)),
    0
  );

  const handleTabOnChange = (evt: SyntheticEvent, newValue: number) => {
    setActivePanel(newValue);
    if (swiperRef.current) {
      swiperRef.current.slideTo(newValue);
    }
  };

  const hanldeSlideChange = (swiper: Swiper) => {
    setActivePanel(swiper.activeIndex);
  };

  return (
    <StyledChartPage className="page-inner has-app-bar has-bottom-nav min-scrollbar">
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
      <Box className="panel-wrapper">
        <Tabs
          value={activePanel}
          onChange={handleTabOnChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label={
              <Box sx={{ color: (theme) => theme.palette.error.main }}>
                支出 ${formatCurrencyWithPlaces(totalExpense)}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ color: (theme) => theme.palette.success.main }}>
                收入 ${formatCurrencyWithPlaces(totalIncome)}
              </Box>
            }
          />
        </Tabs>
        <SwiperView
          slidesPerView={1}
          onSlideChange={hanldeSlideChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide style={{ width: "100vw", display: "flex" }}>
            <Box
              className="section"
              sx={{ display: "flex", width: "100%", paddingBottom: 1 }}
            >
              {expenseRows.length > 0 ? (
                <MyNightingaleChart data={expenseRows} sum={totalExpense} />
              ) : (
                <Box className="no-data-chart">
                  <Typography align="center">沒有資料...</Typography>
                </Box>
              )}
            </Box>
          </SwiperSlide>
          <SwiperSlide style={{ width: "100vw", display: "flex" }}>
            <Box
              className="section"
              sx={{ display: "flex", width: "100%", paddingBottom: 1 }}
            >
              {incomeRows.length > 0 ? (
                <MyNightingaleChart data={incomeRows} sum={totalIncome} />
              ) : (
                <Box className="no-data-chart">
                  <Typography align="center">沒有資料...</Typography>
                </Box>
              )}
            </Box>
          </SwiperSlide>
        </SwiperView>
      </Box>
    </StyledChartPage>
  );
};

export default ChartPage;
