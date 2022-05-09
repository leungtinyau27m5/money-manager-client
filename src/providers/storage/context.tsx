import { createContext, useContext } from "react";
import { TransRow } from "src/data/transactions/transaction.atom";

export interface StorageCtxState {
  store: LocalForage;
  updateItems: (key: string, newRows: TransRow[]) => Promise<unknown>;
  removeItems: (key: string, index: number[]) => Promise<unknown>;
}

export const StorageCtx = createContext<StorageCtxState>({} as StorageCtxState);

export const useStorageCtx = () => useContext(StorageCtx);
