import { Box, ListItemButton, styled } from "@mui/material";
import { TransRow } from "src/data/transactions/transaction.atom";
import ResponsiveTextBox from "../text/ResponsiveTextBox";

const StyledListItemButton = styled(ListItemButton)(() => ({
  display: "grid",
  columnGap: 16,
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 8,
  paddingRight: 8,
  borderRadius: 5,
  gridTemplateColumns: "repeat(3, 1fr)",
  "& > .item-icon": {
    display: "flex",
    columnGap: 8,
  },
  "& > .item-money": {
    display: "flex",
  },
}));

export const Transaction = (props: TransactionProps) => {
  const { data, handleTransactionOnClick } = props;
  const { iconKey, title, money, type } = data;
  return (
    <StyledListItemButton
      className="transaction-item"
      onClick={() => handleTransactionOnClick(data)}
    >
      <Box className="item-icon">
        <Box component="span" className="material-icons-round">
          {iconKey}
        </Box>
        <Box className="title">{title}</Box>
      </Box>
      <Box
        className="item-money"
        sx={{
          color: (theme) => theme.palette.success.main,
          justifyContent: "center",
        }}
      >
        <ResponsiveTextBox str={type === "income" ? `$${money}` : ""} />
      </Box>
      <Box
        className="item-money"
        sx={{
          color: (theme) => theme.palette.error.main,
          justifyContent: "flex-end",
        }}
      >
        <ResponsiveTextBox str={type === "expense" ? `$${money}` : ""} />
      </Box>
    </StyledListItemButton>
  );
};

export interface TransactionProps {
  handleTransactionOnClick: (data: TransRow) => void;
  data: TransRow;
}

export default Transaction;
