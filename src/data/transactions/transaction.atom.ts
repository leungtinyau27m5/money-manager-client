import { atom, selectorFamily, DefaultValue } from "recoil";

export interface TransRow {
  money: string;
  note: string;
  title: string;
  iconKey: string;
  date: number;
  type: "expense" | "income";
  id: string;
}

export const transAtom = atom<{ [date: string]: TransRow[] }>({
  key: "transAtom",
  default: {},
});

export const transSelectorByDate = selectorFamily<
  { [date: number]: TransRow[] },
  string
>({
  key: "transSelectorByDate",
  get:
    (date) =>
    ({ get }) => {
      const raw = get(transAtom);
      if (Array.isArray(raw[date])) {
        const [year, month] = date.split("-");
        const days = new Date(Number(year), Number(month), 0).getDate();
        const data = {} as { [key: number]: TransRow[] };
        const arr = [...raw[date]];
        for (let i = days; i >= 1; i--) {
          data[i] = [];
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].date === i) {
              const temp = arr.splice(j, 1);
              data[i] = data[i].concat(...temp);
              j--;
            }
          }
        }
        return data;
      }
      return {};
    },
});
