import {
  useState,
  SyntheticEvent,
  useRef,
  useMemo,
  useId,
  CSSProperties,
  useCallback,
} from "react";
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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { transSelectorByDate } from "src/data/transactions/transaction.atom";
import MyBarChart from "src/components/charts/MyBarChart";
import YearMonthPicker from "src/components/myDatePicker/YearMonthPicker";
import { dateAtom } from "src/data/date/date.atom";
import MyLinearProgressAsChart from "src/components/charts/MyLinearProgressAsChart";
import CategorizeTranRow from "src/containers/categorize/CategorizeTranRow";
import { defaultColors } from "src/constants/types";

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
      width: "100%",
    },
  },
}));

const ChartPage = () => {
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const setDateAtom = useSetRecoilState(dateAtom);
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

  const handleOnChange = (year: number, month: number) => {
    setDateObj({
      year,
      month,
    });
    setDateAtom(new Date(`${year}/${month + 1}`));
  };

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
          <SwiperSlide
            style={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              padding: 8,
              rowGap: 12,
            }}
          >
            <CategorizeTranRow tranRows={expenseRows} order="desc">
              {(cat, sum) => (
                <>
                  <Box
                    className="section"
                    sx={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 1,
                      margin: 0,
                    }}
                  >
                    {expenseRows.length > 0 ? (
                      <MyNightingaleChart data={cat} sum={sum} />
                    ) : (
                      <Box className="no-data-chart">
                        <Typography align="center">沒有資料...</Typography>
                      </Box>
                    )}
                  </Box>
                  <Box className="section" sx={{ p: 1 }}>
                    {cat.map((ele, index) => (
                      <MyLinearProgressAsChart
                        key={ele[0]}
                        color={defaultColors[index % defaultColors.length]}
                        icon={ele[1].icon}
                        title={ele[0]}
                        value={ele[1].value}
                        percent={(ele[1].value * 100) / sum}
                      />
                    ))}
                  </Box>
                </>
              )}
            </CategorizeTranRow>
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              padding: 8,
              rowGap: 12,
            }}
          >
            <CategorizeTranRow tranRows={incomeRows} order="desc">
              {(cat, sum) => (
                <>
                  <Box
                    className="section"
                    sx={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 1,
                      margin: 0,
                    }}
                  >
                    {incomeRows.length > 0 ? (
                      <MyNightingaleChart data={cat} sum={sum} />
                    ) : (
                      <Box className="no-data-chart">
                        <Typography align="center">沒有資料...</Typography>
                      </Box>
                    )}
                  </Box>
                  <Box className="section" sx={{ p: 1 }}>
                    {/* <MyLinearProgressAsChart color="#F0D" /> */}
                  </Box>
                </>
              )}
            </CategorizeTranRow>
          </SwiperSlide>
        </SwiperView>
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
    </StyledChartPage>
  );
};

export default ChartPage;
