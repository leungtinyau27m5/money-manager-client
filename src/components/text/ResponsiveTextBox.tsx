import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(() => ({
  fontSize: 12,
  width: "100%",
  textAlign: 'center'
}));

const ResponsiveTextBox = (props: ResponsiveTextBoxProps) => {
  const { str } = props;
  const me = useRef<HTMLSpanElement>(null);

  const handleResize = useCallback(() => {
    if (!me.current) return;
    const rect = me.current.getBoundingClientRect();
    const fontSize = rect.width / str.length;
    if (fontSize < 14) {
      me.current.style.transform = `scale(${fontSize}/14)`;
      me.current.style.fontSize = fontSize + "px";
    } else {
      me.current.style.transform = "scale(1)";
      me.current.style.fontSize = 14 + "px";
    }
    me.current.innerText = str;
  }, [str]);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return <StyledBox ref={me}></StyledBox>;
};

export interface ResponsiveTextBoxProps {
  str: string;
}

export default ResponsiveTextBox;
