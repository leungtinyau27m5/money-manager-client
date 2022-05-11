import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  paperClasses,
  styled,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { mainMenuAtom } from "src/data/system/system.atom";
import { Link } from "react-router-dom";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PermDataSettingRoundedIcon from "@mui/icons-material/PermDataSettingRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [`& .${paperClasses.root}`]: {
    width: "80%",
    maxWidth: 280,
    "& > .menu-head": {
      height: "22vh",
      backgroundColor: "#FFCF48",
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      rowGap: theme.spacing(2),
      flexDirection: "column",
      position: "relative",
      "& > .logout-btn": {
        position: "absolute",
        top: 0,
        right: 0,
        color: theme.palette.error.light,
      },
    },
  },
}));

const MainMenu = () => {
  const [mainMenu, setMainMenu] = useRecoilState(mainMenuAtom);

  const handleNavItemOnClick = () => {
    setMainMenu(false);
  };

  return (
    <StyledDrawer
      open={mainMenu}
      className="main-menu-drawer"
      onClose={() => setMainMenu(false)}
    >
      <Box className="menu-head">
        <Avatar src="" sx={{ width: "10vh", height: "10vh" }} />
        <Typography variant="h6" color="white">
          Name
        </Typography>
        <IconButton className="logout-btn" size="large">
          <ExitToAppRoundedIcon />
        </IconButton>
      </Box>
      <Box className="menu-body">
        <List>
          <Link to="/" onClick={handleNavItemOnClick}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardCustomizeRoundedIcon sx={{ color: "blueviolet" }} />
              </ListItemIcon>
              <ListItemText>主頁</ListItemText>
            </ListItemButton>
          </Link>
          <Link to="/chart" onClick={handleNavItemOnClick}>
            <ListItemButton>
              <ListItemIcon>
                <PieChartRoundedIcon sx={{ color: "#20C046" }} />
              </ListItemIcon>
              <ListItemText>圖表</ListItemText>
            </ListItemButton>
          </Link>
          {/* <Link to="/dashboard/category" onClick={handleNavItemOnClick}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryRoundedIcon color="primary" />
              </ListItemIcon>
              <ListItemText>種類</ListItemText>
            </ListItemButton>
          </Link> */}
          <Divider />
          {/* <ListItemButton>
            <ListItemIcon>
              <GetAppRoundedIcon sx={{ color: "#FFCF48" }} />
            </ListItemIcon>
            <ListItemText>導出</ListItemText>
          </ListItemButton>
          <Divider /> */}
          {/* <Link to="/dashboard/setting" onClick={handleNavItemOnClick}>
            <ListItemButton>
              <ListItemIcon>
                <PermDataSettingRoundedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>設置</ListItemText>
            </ListItemButton>
          </Link> */}
        </List>
      </Box>
      <Box className="menu-trailing"></Box>
    </StyledDrawer>
  );
};

export default MainMenu;
