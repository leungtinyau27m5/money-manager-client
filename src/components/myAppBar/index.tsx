import { AppBar, IconButton, styled, Toolbar, Box } from "@mui/material";
import MenuOpenRounded from "@mui/icons-material/MenuOpenRounded";
import RefreshButton from "../buttons/RefreshButton";
import { useRecoilState } from "recoil";
import { mainMenuAtom } from "src/data/system/system.atom";
import MainMenu from "../mainMenu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({}));

const MyAppBar = () => {
  const [mainMenu, setMainMenu] = useRecoilState(mainMenuAtom);

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          color="inherit"
          onClick={() => setMainMenu(true)}
        >
          <MenuOpenRounded />
        </IconButton>
        <Box className="" sx={{ flexGrow: 1 }}></Box>
        <RefreshButton />
      </Toolbar>
      <MainMenu />
    </StyledAppBar>
  );
};

export default MyAppBar;
