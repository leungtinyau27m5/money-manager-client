import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  styled,
  paperClasses,
  ListItemButton,
  Button,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { allIcons } from "src/constants/types";
import { useState } from "react";
import clsx from "clsx";
import { MyStyledTextField } from "../forms/MyTextField";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${paperClasses.root}`]: {
    "& > .panel-wrapper": {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      "& > .item-wrapper": {
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        transition: "all .3s ease-in-out",
        "&.selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
    "& > .input-wrapper": {
      display: "flex",
      width: "100%",
      alignItems: "center",
      columnGap: 12,
      marginTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
    },
    "& > .action-wrapper": {
      display: "flex",
      marginTop: 12,
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

const CreateCategory = (props: CreateCategoryProps) => {
  const { open, onClose } = props;
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState("");
  return (
    <StyledDialog
      fullWidth
      open={open}
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
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Typography>新增種類</Typography>
        </Toolbar>
      </AppBar>
      <Box className="panel-wrapper">
        {allIcons.map((ele) => (
          <ListItemButton
            className={clsx("item-wrapper", { selected: selected === ele })}
            key={ele}
            onClick={() => setSelected(ele)}
          >
            <Box component="span" className="material-icons-round">
              {ele}
            </Box>
          </ListItemButton>
        ))}
      </Box>
      <Box className="input-wrapper">
        <Box sx={{ width: 50 }}>
          <Typography>名稱</Typography>
        </Box>
        <MyStyledTextField
          variant="filled"
          className="no-label"
          value={title}
          onChange={(evt) => {
            setTitle(evt.target.value);
          }}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <Box className="action-wrapper">
        <Button variant="contained" sx={{ width: 160 }}>
          確定
        </Button>
      </Box>
    </StyledDialog>
  );
};

export interface CreateCategoryProps {
  open: boolean;
  onClose: () => void;
  type: "expense" | "income";
}

export default CreateCategory;
