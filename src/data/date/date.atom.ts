import { atom } from "recoil";

export const yearAtom = atom({
  key: "yearAtom",
  default: new Date().getFullYear(),
});

export const monthAtom = atom({
  key: "monthAtom",
  default: new Date().getMonth(),
});

export const dateAtom = atom({
  key: "dateAtom",
  default: new Date().getDate(),
});
