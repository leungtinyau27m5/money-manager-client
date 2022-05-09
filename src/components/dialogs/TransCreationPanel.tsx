import {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import {
  AppBar,
  Box,
  BoxProps,
  Dialog,
  IconButton,
  Slide,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Swiper as SwiperView, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import type { Swiper } from "swiper";
import ExpenseForm from "../forms/ExpenseForm";
import IncomeForm from "../forms/IncomeForm";
import { StorageCtx, StorageCtxState } from "src/providers/storage/context";
import { transAtom, TransRow } from "src/data/transactions/transaction.atom";
import { useSetRecoilState } from "recoil";

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const TabPanel = (
  props: {
    value: number;
    index: number;
    children?: ReactNode;
    dir?: string;
  } & BoxProps
) => {
  const { value, index, children, dir, ...otherBoxProps } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`trans-creation-panel-${index}`}
      aria-labelledby={`full-width-transaction-tab-${index}`}
      {...otherBoxProps}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

const TransCreationPanel = (props: TransCreationPanelProps) => {
  const { open, onClose, updateItems } = props;
  const setTransData = useSetRecoilState(transAtom);
  const [activePanel, setActivePanel] = useState(0);
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
    const result = await updateItems(`${year}-${month}`, [
      {
        money,
        title,
        type,
        note,
        iconKey,
        date: dateObj.getDate(),
      },
    ]);
    console.log(result);
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => onClose()}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
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
            <ExpenseForm submitCallback={submitCallback} />
          </SwiperSlide>
          <SwiperSlide style={{ width: "100vw", display: "flex" }}>
            <IncomeForm submitCallback={submitCallback} />
          </SwiperSlide>
        </SwiperView>
      </Box>
    </Dialog>
  );
};

export interface TransCreationPanelProps {
  open: boolean;
  updateItems: StorageCtxState["updateItems"];
  onClose: () => void;
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
