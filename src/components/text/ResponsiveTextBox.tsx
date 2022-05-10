import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(() => ({
  fontSize: 12,
  width: "fit-content",
  textAlign: "center",
}));

const ResponsiveTextBox = (props: ResponsiveTextBoxProps) => {
  const { str } = props;
  const me = useRef<HTMLSpanElement>(null);

  const handleResize = useCallback(() => {
    if (!me.current) return;
    if (!me.current.parentElement) return;
    const rect = me.current.parentElement.getBoundingClientRect();
    const fontSize = Math.abs(rect.width / (str.length - 9));
    me.current.style.fontSize = 14 + "px";
    if (fontSize < 14) {
      me.current.style.transform = `scale(${fontSize / 14})`;
    } else {
      me.current.style.transform = "scale(1)";
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

  return <StyledBox ref={me} className="responsive-text-node"></StyledBox>;
};

export interface ResponsiveTextBoxProps {
  str: string;
}

export default ResponsiveTextBox;
