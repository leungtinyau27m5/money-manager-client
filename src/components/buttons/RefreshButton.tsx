import { IconButton, IconButtonProps, styled } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  AnimationEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

const StyledIconButton = styled(IconButton)(() => ({
  "&.rotate-active": {
    animation: "rotate 1.2s ease forwards",
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const RefreshButton = (props: RefreshButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const mounted = useRef(false);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    setClicked(true);
    setTimeout(() => {
      if (mounted) setClicked(false);
    }, 1200);
    if (props.onClick) props.onClick(evt);
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      setClicked(false);
      mounted.current = false;
    };
  }, []);

  return (
    <StyledIconButton
      size="large"
      color="inherit"
      aria-label="refresh"
      {...props}
      className={clsx(
        "refresh-btn",
        { "rotate-active": clicked },
        props.className
      )}
      onClick={handleOnClick}
    >
      <RefreshRoundedIcon />
    </StyledIconButton>
  );
};

export interface RefreshButtonProps extends IconButtonProps {}

export default RefreshButton;
