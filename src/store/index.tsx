import React, { Dispatch, SetStateAction, useState } from 'react';

import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  recordList: recordListType[];
  deleteRecordItem: (id: number) => void;
  recordModalOpen: boolean;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  mediaModalOpen: boolean;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
};

export const MainContext = React.createContext<ContextType>({
  recordList: [],
  deleteRecordItem: () => {},
  recordModalOpen: false,
  setRecordModalState: () => {},
  mediaModalOpen: false,
  setMediaModalState: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const [storedRecordList, setStoredRecordList] =
    useState<recordListType[]>(recordList);
  const [recordModalState, setRecordModalState] = useState(false);
  const [mediaModalState, setMediaModalState] = useState(false);

  const deleteRecordItemHandler = (id: number) => {
    setStoredRecordList(storedRecordList.filter(item => item.id !== id));
  };

  const contextValue: ContextType = {
    recordList: storedRecordList,
    deleteRecordItem: deleteRecordItemHandler,
    recordModalOpen: recordModalState,
    setRecordModalState: setRecordModalState,
    mediaModalOpen: mediaModalState,
    setMediaModalState: setMediaModalState,
  };
  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
