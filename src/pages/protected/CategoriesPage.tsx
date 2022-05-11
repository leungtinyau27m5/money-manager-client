import { Box, ListItemButton, styled, Typography } from "@mui/material";
import ResponsiveTextBox from "src/components/text/ResponsiveTextBox";
import { expenseTypes, incomeTypes } from "src/constants/types";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreateCategory from "src/components/dialogs/CreateCategory";
import { useRef, useState } from "react";

const StyledCategoriesPage = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  rowGap: 12,
  padding: 8,
  paddingTop: 24,
  paddingBottom: 160,
  "& .icons-list-section": {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    "& > .icon-wrapper": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      width: 80,
      flex: "inherit",
      "&.add-btn": {},
    },
  },
}));

const CategoriesPage = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const typeRef = useRef<"expense" | "income">("expense");

  const togglePanel = (type: "expense" | "income") => {
    typeRef.current = type;
    setOpenPanel(true);
  };

  return (
    <StyledCategoriesPage className="page-inner has-app-bar has-bottom-nav min-scrollbar">
      <Typography variant="subtitle1">支出</Typography>
      <Box className="section icons-list-section">
        {expenseTypes.map((ele) => (
          <ListItemButton className="icon-wrapper" key={ele.text}>
            <Box component="span" className="material-icons-round">
              {ele.icon}
            </Box>

            <ResponsiveTextBox str={ele.text} />
          </ListItemButton>
        ))}
        <ListItemButton
          className="icon-wrapper add-btn"
          onClick={() => togglePanel("expense")}
        >
          <AddRoundedIcon />
          <ResponsiveTextBox str="新增" />
        </ListItemButton>
      </Box>
      <Typography variant="subtitle1">收入</Typography>
      <Box className="section icons-list-section">
        {incomeTypes.map((ele) => (
          <ListItemButton className="icon-wrapper" key={ele.text}>
            <Box component="span" className="material-icons-round">
              {ele.icon}
            </Box>
            <ResponsiveTextBox str={ele.text} />
          </ListItemButton>
        ))}
        <ListItemButton
          className="icon-wrapper add-btn"
          onClick={() => togglePanel("income")}
        >
          <AddRoundedIcon />
          <ResponsiveTextBox str="新增" />
        </ListItemButton>
      </Box>
      <CreateCategory
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        type={typeRef.current}
      />
    </StyledCategoriesPage>
  );
};

export default CategoriesPage;
