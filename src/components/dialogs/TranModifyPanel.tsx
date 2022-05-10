import { Dialog, AppBar, IconButton, Toolbar, Box } from "@mui/material";
import { TransitionSlideUp } from "src/components/transitions";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { TransRow } from "src/data/transactions/transaction.atom";
import { StorageCtx, StorageCtxState } from "src/providers/storage/context";
import ModifyForm from "../forms/ModifyForm";

const TranModifyPanel = (props: TranModifyPanelProps) => {
  const { removeItems, open, onClose } = props;

  return (
    <Dialog
      open={open}
      fullWidth
      TransitionComponent={TransitionSlideUp}
      onClose={() => onClose()}
      PaperProps={{
        sx: {
          margin: 0,
          height: "100%",
          width: "100%",
          maxHeight: "none",
        },
      }}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box className="panel-wrapper">
        <ModifyForm />
      </Box>
    </Dialog>
  );
};

export interface TranModifyPanelProps {
  open: boolean;
  onClose: () => void;
  removeItems: StorageCtxState["removeItems"];
  updateItems: StorageCtxState["updateItems"];
  target: TransRow | null;
}

export default TranModifyPanel;
