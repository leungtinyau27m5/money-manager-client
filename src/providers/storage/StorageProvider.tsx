import localforage from "localforage";
import { ReactNode, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { transAtom, TransRow } from "src/data/transactions/transaction.atom";
import { StorageCtx } from "./context";

const StorageProvider = (props: StorageProviderProps) => {
  const { current: store } = useRef(
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
  const setTransData = useSetRecoilState(transAtom);

  const updateItems = async (key: string, newRows: TransRow[]) => {
    let response = await store.getItem(key);
    if (response === null) response = [] as TransRow[];
    response = (response as TransRow[]).concat(...newRows);
    setTransData((state) => ({
      ...state,
      [key]: response as TransRow[],
    }));
    const result = await store.setItem(key, response);
    return result;
  };

  const removeItems = async (key: string, index: number[]) => {
    let response = await store.getItem(key);
    if (response === null) return;
    response as TransRow[];
    index.forEach((i) => {
      (response as TransRow[]).splice(i, 1);
    });
    setTransData((state) => ({
      ...state,
      [key]: response as TransRow[],
    }));
    const result = await store.setItem(key, response);
    return result;
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const key = `${year}-${month}`;
    store.getItem(key).then((res) => {
      if (res) {
        setTransData((state) => ({
          ...state,
          [key]: res as TransRow[],
        }));
      }
    });
  }, [setTransData, store]);

  return (
    <StorageCtx.Provider
      value={{
        store,
        removeItems,
        updateItems,
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
