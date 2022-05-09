import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BottomNavBar from "src/components/bottomNavBar";
import MyAppBar from "src/components/myAppBar";
import { userSelector } from "src/data/user/user.atom";
import { getCookie } from "src/utils/storage";

const ProtectedPage = () => {
  const [userData, setUserData] = useRecoilState(userSelector);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const getUserFromToken = useCallback((token: string) => {}, []);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      setChecked(true);
      return;
    }
    getUserFromToken(token);
  }, [getUserFromToken]);

  return (
    <Box className="page">
      <MyAppBar />
      <Outlet />
      <BottomNavBar />
    </Box>
  );
  // return checked && userData ? <Outlet /> : <></>;
};

export default ProtectedPage;
