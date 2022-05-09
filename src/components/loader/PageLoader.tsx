import { Backdrop, CircularProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <Backdrop
      open={true}
      sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default PageLoader;
