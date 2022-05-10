import {
  Dialog,
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { TransitionSlideUp } from "src/components/transitions";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { TransRow } from "src/data/transactions/transaction.atom";
import { StorageCtxState } from "src/providers/storage/context";
import ModifyForm from "../forms/ModifyForm";
import { useMemo, useState } from "react";

const TranModifyPanel = (props: TranModifyPanelProps) => {
  const { removeItems, open, onClose, target, updateItems, currentKey } = props;
  const [showLoader, setShowLoader] = useState(false);
  const dateObj = useMemo(() => {
    const [year, month] = currentKey.split("-");
    return new Date(+year, +month, target ? target.date : new Date().getDate());
  }, [currentKey, target]);

  const submitCallback: ModifySubmitCallback = async (type, data) => {
    setShowLoader(true);
    if (type === "update") {
      await updateItems(currentKey, [data]);
    } else if (type === "delete") {
      await removeItems(currentKey, [data.id]);
    }
    setShowLoader(false);
    onClose();
  };

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
      <AppBar
        position="relative"
        color="secondary"
        sx={{ backgroundColor: "#FFCF48" }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <Typography>修改</Typography>
        </Toolbar>
      </AppBar>
      <Box className="panel-wrapper">
        {target && (
          <ModifyForm
            data={target}
            modifySubmitCallback={submitCallback}
            defaultDate={dateObj}
          />
        )}
      </Box>
      <Backdrop
        open={showLoader}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress />
      </Backdrop>
    </Dialog>
  );
};

export type ModifySubmitCallback = (
  type: "delete" | "update",
  data: TransRow
) => void;

export interface TranModifyPanelProps {
  open: boolean;
  onClose: () => void;
  removeItems: StorageCtxState["removeItems"];
  updateItems: StorageCtxState["updateItems"];
  target: TransRow | null;
  currentKey: string;
}

export default TranModifyPanel;
