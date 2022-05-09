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
import { StorageCtx } from "src/providers/storage/context";

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
  const { open, onClose } = props;
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
            <StorageCtx.Consumer>
              {({ store }) => <ExpenseForm store={store} />}
            </StorageCtx.Consumer>
          </SwiperSlide>
          <SwiperSlide style={{ width: "100vw", display: "flex" }}>
            <StorageCtx.Consumer>
              {({ store }) => <IncomeForm store={store} />}
            </StorageCtx.Consumer>
          </SwiperSlide>
        </SwiperView>
      </Box>
    </Dialog>
  );
};

export interface TransCreationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default TransCreationPanel;
