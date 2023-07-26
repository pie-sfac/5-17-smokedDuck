import React, { useState } from 'react';

import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  recordList: recordListType[];
  deleteRecordItem: (id: number) => void;
};

export const MainContext = React.createContext<ContextType>({
  recordList: [],
  deleteRecordItem: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const [storedRecordList, setStoredRecordList] =
    useState<recordListType[]>(recordList);

  const deleteRecordItemHandler = (id: number) => {
    setStoredRecordList(storedRecordList.filter(item => item.id !== id));
  };

  const contextValue: ContextType = {
    recordList: storedRecordList,
    deleteRecordItem: deleteRecordItemHandler,
  };
  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
