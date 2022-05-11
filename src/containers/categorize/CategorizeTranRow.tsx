import { ReactNode, useMemo, useRef } from "react";
import { TransRow } from "src/data/transactions/transaction.atom";
import { currencyToNumber } from "src/helpers/common";

const CategorizeTranRow = (props: CategorizeTranRowProps) => {
  const { tranRows, children, order = "asc" } = props;
  const max = useRef({ title: "", value: 0 });
  const sum = useMemo(() => {
    return tranRows.reduce(
      (total, ele) => (total += currencyToNumber(ele.money)),
      0
    );
  }, [tranRows]);
  const cat = useMemo(() => {
    const obj = {} as {
      [name: string]: CategorizedType;
    };
    tranRows.forEach((ele) => {
      if (!(ele.title in obj)) {
        obj[ele.title] = {
          icon: ele.iconKey,
          date: ele.date,
          value: 0,
        };
      }
      obj[ele.title].value += currencyToNumber(ele.money);
      if (obj[ele.title].value > max.current.value) {
        max.current = {
          title: ele.title,
          value: obj[ele.title].value,
        };
      }
    });
    const sorted = Object.entries(obj).sort((a, b) =>
      order === "asc" ? a[1].value - b[1].value : b[1].value - a[1].value
    );
    return sorted;
  }, [order, tranRows]);
  return <>{children(cat, sum, max.current)}</>;
};

export type CategorizedType = {
  value: number;
  icon: string;
  date: number;
};

export interface CategorizeTranRowProps {
  tranRows: TransRow[];
  children: (
    cat: [string, CategorizedType][],
    sum: number,
    max: { title: string; value: number }
  ) => ReactNode;
  order?: "desc" | "asc";
}

export default CategorizeTranRow;
