import { SyntheticEvent, useRef, useState } from "react";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Swiper as SwiperView, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import type { Swiper } from "swiper";
import ExpenseForm from "../forms/ExpenseForm";
import IncomeForm from "../forms/IncomeForm";
import { StorageCtxState } from "src/providers/storage/context";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import { TransitionSlideUp } from "../transitions";

const TransCreationPanel = (props: TransCreationPanelProps) => {
  const { open, onClose, addItems, defaultDate } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [activePanel, setActivePanel] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const swiperRef = useRef<Swiper | null>(null);

  const handleTabOnChange = (evt: SyntheticEvent, newValue: number) => {
    setActivePanel(newValue);
    if (swiperRef.current) {
      swiperRef.current.slideTo(newValue);
    }
  };

  const hanldeSlideChange = (swiper: Swiper) => {
    setActivePanel(swiper.activeIndex);
  };

  const submitCallback: SubmitCallbackHandler = async (data) => {
    const { date: dateObj, money, title, type, note, iconKey } = data;
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    setShowLoader(true);
    await addItems(`${year}-${month}`, [
      {
        money,
        title,
        type,
        note,
        iconKey,
        date: dateObj.getDate(),
        id: uuidv4(),
      },
    ])
      .catch((error) => {
        enqueueSnackbar("Update item fail, please retry", {
          variant: "warning",
        });
      })
      .finally(() => {
        setShowLoader(false);
        onClose();
      });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose()}
      TransitionComponent={TransitionSlideUp}
      PaperProps={{
        sx: {
          margin: 0,
          height: "100%",
          width: "100%",
          maxHeight: "none",
        },
      }}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <Typography>新增</Typography>
        </Toolbar>
      </AppBar>
      <Box className="panel-wrapper">
        <Tabs
          value={activePanel}
          onChange={handleTabOnChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="支出" />
          <Tab label="收入" />
        </Tabs>
        <SwiperView
          slidesPerView={1}
          onSlideChange={hanldeSlideChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide style={{ width: "100vw", display: "flex" }}>
            <ExpenseForm
              submitCallback={submitCallback}
              defaultDate={defaultDate}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "100vw", display: "flex" }}>
            <IncomeForm submitCallback={submitCallback} />
          </SwiperSlide>
        </SwiperView>
      </Box>
      <Backdrop
        open={showLoader}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress />
      </Backdrop>
    </Dialog>
  );
};

export interface TransCreationPanelProps {
  open: boolean;
  addItems: StorageCtxState["addItems"];
  onClose: () => void;
  defaultDate?: Date;
}

export type SubmitCallbackHandler = (data: {
  date: Date;
  title: string;
  money: string;
  note: string;
  iconKey: string;
  type: "expense" | "income";
}) => void;

export default TransCreationPanel;
