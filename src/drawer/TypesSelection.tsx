import {
  Box,
  ButtonBase,
  Dialog,
  styled,
  Typography,
} from "@mui/material";

const StyledBox = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  width: "100%",
  overflow: "auto",
  gap: 8,
  padding: 8,
  maxHeight: "40vh",
  "& > .type-item": {
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    alignItems: "center",
    borderRadius: 8,
    "& .material-icons-round": {
      fontSize: "1.65rem",
      color: "grey",
    },
    "& .item-text": {
      fontSize: "0.9rem",
    },
  },
}));

const TypesSection = (props: TypesSectionProps) => {
  const { open, onClose, itemList } = props;
  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth>
      <StyledBox className="min-scrollbar">
        {itemList.map((ele) => (
          <ButtonBase className="type-item" key={ele.icon}>
            <Box component="span" className="material-icons-round">
              {ele.icon}
            </Box>
            <Typography variant="caption" className="item-text">
              {ele.text}
            </Typography>
          </ButtonBase>
        ))}
      </StyledBox>
    </Dialog>
  );
};

export interface TypesSectionProps {
  open: boolean;
  onClose: () => void;
  itemList: { icon: string; text: string }[];
}

export default TypesSection;