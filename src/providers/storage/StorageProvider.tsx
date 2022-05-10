import localforage from "localforage";
import { ReactNode, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { transAtom, TransRow } from "src/data/transactions/transaction.atom";
import { StorageCtx, StorageCtxState } from "./context";

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

  const addItems: StorageCtxState["addItems"] = async (key, newRows) => {
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

  const removeItems: StorageCtxState["removeItems"] = async (key, ids) => {
    let response = await store.getItem(key);
    if (response === null) return;
    const rows = response as TransRow[];
    ids.forEach((id) => {
      const index = rows.findIndex((ele) => ele.id === id);
      if (index !== -1) rows.splice(index, 1);
    });
    setTransData((state) => ({
      ...state,
      [key]: rows,
    }));
    const result = await store.setItem(key, rows);
    return result;
  };

  const updateItems: StorageCtxState["updateItems"] = async (key, newData) => {
    const response = await store.getItem(key);
    if (response === null) return;
    const rows = response as TransRow[];
    newData.forEach((data) => {
      const index = rows.findIndex((ele) => ele.id === data.id);
      if (index !== -1) rows[index] = data;
    });
    setTransData((state) => ({
      ...state,
      [key]: rows,
    }));
    const result = await store.setItem(key, rows);
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
        addItems,
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
