import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { mediaList, mediaListType } from '@/utils/constants/mediaList';
import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  recordList: recordListType[];
  mediaList: mediaListType[];
  deleteRecordItem: (id: number) => void;
  deleteMediaItem: (id: number) => void;
  recordModalOpen: boolean;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  mediaModalOpen: boolean;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  selectedRecordCard: string;
  setSelectedRecordCard: Dispatch<SetStateAction<string>>;
};

export const MainContext = React.createContext<ContextType>({
  recordList: [],
  mediaList: [],
  deleteRecordItem: () => {},
  deleteMediaItem: () => {},
  recordModalOpen: false,
  setRecordModalState: () => {},
  mediaModalOpen: false,
  setMediaModalState: () => {},
  selectedTemplateTitle: '',
  setSelectedTemplateTitle: () => {},
  selectedRecordCard: '',
  setSelectedRecordCard: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const [storedRecordList, setStoredRecordList] =
    useState<recordListType[]>(recordList);
  const [recordModalState, setRecordModalState] = useState(false);
  const [mediaModalState, setMediaModalState] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [selectedRecordCard, setSelectedRecordCard] = useState<string>('');

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
    recordModalOpen: recordModalState,
    setRecordModalState: setRecordModalState,
    mediaModalOpen: mediaModalState,
    setMediaModalState: setMediaModalState,
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    selectedRecordCard,
    setSelectedRecordCard,
  };
  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
