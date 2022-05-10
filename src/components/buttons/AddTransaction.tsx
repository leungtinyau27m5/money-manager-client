import { useState } from "react";
import { alpha, IconButton, styled } from "@mui/material";
import TransCreationPanel from "src/components/dialogs/TransCreationPanel";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { StorageCtx } from "src/providers/storage/context";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#FFCF48",
  color: "white",
  position: "fixed",
  bottom: 80,
  left: 20,
  boxShadow: "0px 0px 5px 2px rgba(15, 15, 15, 0.15)",
  "&:hover": {
    backgroundColor: alpha("#FFCF48", 0.75),
  },
  [theme.breakpoints.up("md")]: {
    left: "calc((100vw - 600px) / 2 + 20px)",
  },
}));

const AddTransaction = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <StyledIconButton size="large" onClick={() => setShowPanel(true)}>
        <AddRoundedIcon />
      </StyledIconButton>
      <StorageCtx.Consumer>
        {({ addItems }) => (
          <TransCreationPanel
            open={showPanel}
            addItems={addItems}
            onClose={() => setShowPanel(false)}
          />
        )}
      </StorageCtx.Consumer>
    </>
  );
};

export default AddTransaction;
