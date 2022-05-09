import { atom, selectorFamily, DefaultValue } from "recoil";

export interface TransRow {
  money: string;
  note: string;
  title: string;
  iconKey: string;
  date: number;
  type: "expense" | "income";
}

export const transAtom = atom<{ [date: string]: TransRow[] }>({
  key: "transAtom",
  default: {},
});

export const transSelectorByDate = selectorFamily<TransRow[], string>({
  key: "transSelectorByDate",
  get:
    (date) =>
    ({ get }) => {
      const raw = get(transAtom);
      if (raw[date]) return raw[date];
      return [];
    },
  set:
    (date) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        set(transAtom, (state) => ({
          ...state,
          [date]: [],
        }));
        return;
      }
      set(transAtom, (state) => ({
        ...state,
        [date]: newValue,
      }));
    },
});
