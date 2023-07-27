import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Question } from '@/types/question.interface';
import { mediaList, mediaListType } from '@/utils/constants/mediaList';
import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  recordModalOpen: boolean;
  mediaModalOpen: boolean;
  selectedTemplateTitle: string;
  recordList: recordListType[];
  mediaList: mediaListType[];
  questionList: Question[];
  deleteRecordItem: (id: number) => void;
  deleteMediaItem: (id: number) => void;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  setQuestionList: Dispatch<SetStateAction<Question[]>>;
};

export const MainContext = React.createContext<ContextType>({
  recordList: [],
  mediaList: [],
  questionList: [],
  recordModalOpen: false,
  mediaModalOpen: false,
  selectedTemplateTitle: '',
  deleteRecordItem: () => {},
  deleteMediaItem: () => {},
  setRecordModalState: () => {},
  setMediaModalState: () => {},
  setSelectedTemplateTitle: () => {},
  setQuestionList: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const [recordModalState, setRecordModalState] = useState(false);
  const [mediaModalState, setMediaModalState] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [storedRecordList, setStoredRecordList] =
    useState<recordListType[]>(recordList);
  const [storedQuestionList, setStoredQuestionList] = useState<Question[]>([]);
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
    questionList: storedQuestionList,
    deleteMediaItem: deleteMediaItemHandler,
    deleteRecordItem: deleteRecordItemHandler,
    recordModalOpen: recordModalState,
    setRecordModalState,
    mediaModalOpen: mediaModalState,
    setMediaModalState,
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    setQuestionList: setStoredQuestionList,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
