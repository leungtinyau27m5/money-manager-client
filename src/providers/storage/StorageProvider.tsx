import localforage from "localforage";
import { ReactNode, useEffect, useState } from "react";
import { StorageCtx } from "./context";

const StorageProvider = (props: StorageProviderProps) => {
  const [store, setStore] = useState(
    localforage.createInstance({
      name: "moneyManager",
      storeName: "transactionStore",
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
    })
  );

  return (
    <StorageCtx.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </StorageCtx.Provider>
  );
};

export interface StorageProviderProps {
  children?: ReactNode;
}

export default StorageProvider;
