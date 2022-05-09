import { atom, selector, DefaultValue } from "recoil";
import { deleteCookie } from "src/utils/storage";

export interface UserAtom {}

export const userAtom = atom<UserAtom | null>({
  key: "userAtom",
  default: null,
});

export const userSelector = selector<UserAtom | null>({
  key: "userSelector",
  get: ({ get }) => {
    const data = get(userAtom);
    return data;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue || newValue === null) {
      deleteCookie("token");
    }
    set(userAtom, newValue);
  },
});
