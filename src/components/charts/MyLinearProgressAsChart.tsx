import {
  alpha,
  Box,
  LinearProgress,
  linearProgressClasses,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";
import { CSSProperties } from "react";
import { formatCurrencyWithPlaces } from "src/helpers/common";

const StyledBox = styled(ListItemButton)(() => ({
  display: "grid",
  gridTemplateColumns: "30px 1fr",
  columnGap: 12,
  paddingLeft: 8,
  paddingRight: 8,
  "& .icon-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .progress-container": {
    display: "flex",
    flexDirection: "column",
    "& .progress-content": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));

const MyLinearProgressAsChart = (props: MyLinearProgressAsChartProps) => {
  const { color, icon, title, value, percent } = props;
  return (
    <StyledBox>
      <Box className="icon-container">
        <Box component="span" className="material-icons-round">
          {icon}
        </Box>
      </Box>
      <Box className="progress-container">
        <Box className="progress-content">
          <Box>
            {title}&nbsp;
            <Box
              component="span"
              sx={{ fontSize: 12, transform: "scale(0.8)" }}
            >
              {percent.toFixed(2)}%
            </Box>
          </Box>
          <Typography>${formatCurrencyWithPlaces(value)}</Typography>
        </Box>
        <Box className="progress-bar">
          <LinearProgress
            variant="determinate"
            sx={{
              color: color,
              backgroundColor: alpha(color, 0.15),
              borderRadius: 5,
              height: 8,
              [`& .${linearProgressClasses.bar}`]: {
                backgroundColor: color,
              },
            }}
            value={percent}
          />
        </Box>
      </Box>
    </StyledBox>
  );
};

export interface MyLinearProgressAsChartProps {
  color: Exclude<CSSProperties["color"], undefined>;
  icon: string;
  title: string;
  value: number;
  percent: number;
}

export default MyLinearProgressAsChart;
