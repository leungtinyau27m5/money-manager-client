import { createContext, useContext } from "react";

export interface StorageCtxState {
  store: LocalForage;
}

export const StorageCtx = createContext<StorageCtxState>({} as StorageCtxState);

export const useStorageCtx = () => useContext(StorageCtx);
