import React, { useCallback, useState } from 'react';

import { mediaList, mediaListType } from '@/utils/constants/mediaList';
import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  recordList: recordListType[];
  mediaList: mediaListType[];
  deleteRecordItem: (id: number) => void;
  deleteMediaItem: (id: number) => void;
};

export const MainContext = React.createContext<ContextType>({
  recordList: [],
  mediaList: [],
  deleteRecordItem: () => {},
  deleteMediaItem: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const [storedRecordList, setStoredRecordList] =
    useState<recordListType[]>(recordList);

  const [storedMediaList, setStoredMediaList] =
    useState<mediaListType[]>(mediaList);

  const deleteRecordItemHandler = (id: number) => {
    setStoredRecordList(storedRecordList.filter(item => item.id !== id));
  };

  const deleteMediaItemHandler = useCallback(
    (id: number) => {
      setStoredMediaList(storedMediaList.filter(item => item.id !== id));
    },
    [storedMediaList]
  );

  const contextValue: ContextType = {
    recordList: storedRecordList,
    mediaList: storedMediaList,
    deleteMediaItem: deleteMediaItemHandler,
    deleteRecordItem: deleteRecordItemHandler,
  };
  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
