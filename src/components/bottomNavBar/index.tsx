import { Box, ButtonBase, styled, svgIconClasses } from "@mui/material";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PermDataSettingRoundedIcon from "@mui/icons-material/PermDataSettingRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const StyledBottomNavBar = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  display: "flex",
  boxShadow: "0px -2px 5px 2px rgba(15, 15, 15, 0.15)",
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.pageMaxWidth,
  },
  "& > *": {
    flexGrow: 1,
    height: 54,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:not(:last-of-type)": {
      borderRight: "1px solid rgba(15, 15, 15, 0.08)",
    },
    "& > button": {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      rowGap: 2,
      overflow: "hidden",
      "& > .label": {
        transition: "all .3s ease-in-out",
        transform: "translateY(0)",
        opacity: 1,
      },
      [`& .${svgIconClasses.root}`]: {
        transform: "translateY(0px)",
        transition: "all .3s ease-in-out",
      },
      "&.active": {
        "& > .label": {
          transform: "translateY(100%)",
          opacity: 0,
        },
        [`& .${svgIconClasses.root}`]: {
          transform: "translateY(10px)",
        },
      },
    },
  },
}));

const BottomNavBar = () => {
  const location = useLocation();

  return (
    <StyledBottomNavBar>
      <Link to="/dashboard">
        <ButtonBase
          className={clsx("nav-item", {
            active: location.pathname === "/dashboard",
          })}
        >
          <DashboardCustomizeRoundedIcon sx={{ color: "blueviolet" }} />
          <Box component="span" className="label">
            主頁
          </Box>
        </ButtonBase>
      </Link>
      <Link to="/dashboard/chart">
        <ButtonBase
          className={clsx("nav-item", {
            active: location.pathname.match("/dashboard/chart"),
          })}
        >
          <PieChartRoundedIcon sx={{ color: "#20C046" }} />
          <Box component="span" className="label">
            圖表
          </Box>
        </ButtonBase>
      </Link>
      <Link to="/dashboard/category">
        <ButtonBase
          className={clsx("nav-item", {
            active: location.pathname.match("/dashboard/category"),
          })}
        >
          <CategoryRoundedIcon color="primary" />
          <Box component="span" className="label">
            種類
          </Box>
        </ButtonBase>
      </Link>
      <Link to="/dashboard/setting">
        <ButtonBase
          className={clsx("nav-item", {
            active: location.pathname.match("/dashboard/setting"),
          })}
        >
          <PermDataSettingRoundedIcon color="secondary" />
          <Box component="span" className="label">
            設置
          </Box>
        </ButtonBase>
      </Link>
    </StyledBottomNavBar>
  );
};

export default BottomNavBar;
