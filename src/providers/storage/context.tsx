import { createContext, useContext } from "react";
import { TransRow } from "src/data/transactions/transaction.atom";

export interface StorageCtxState {
  store: LocalForage;
  addItems: (key: string, newRows: TransRow[]) => Promise<unknown>;
  removeItems: (key: string, ids: string[]) => Promise<unknown>;
  updateItems: (key: string, newData: TransRow[]) => Promise<unknown>;
}

export const StorageCtx = createContext<StorageCtxState>({} as StorageCtxState);

export const useStorageCtx = () => useContext(StorageCtx);
