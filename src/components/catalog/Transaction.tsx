import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  columnGap: 8,
  "& > .item-money": {
    flex: 1,
  },
}));

export const Transaction = (props: TransactionProps) => {
  const { icon, title, money } = props;
  return (
    <StyledBox className="transaction-item">
      <Box className="item-icon">
        <Box component="span" className="material-icons-rounded">
          {icon}
        </Box>
      </Box>
      <Box className="item-title">{title}</Box>
      <Box className="item-money">{money}</Box>
    </StyledBox>
  );
};

export interface TransactionProps {
  icon: string;
  title: string;
  money: number;
}

export default Transaction;
