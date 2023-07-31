import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';

import { Question } from '@/types/question.interface';
import { tokenType } from '@/types/token.interface';
import { categoryList, categoryListType } from '@/utils/constants/categoryList';
import { mediaList, mediaListType } from '@/utils/constants/mediaList';
import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  loginToken: tokenType;
  recordModalOpen: boolean;
  mediaModalOpen: boolean;
  addMediaItem: (mediaItemWithoutId: Omit<mediaListType, 'id'>) => void;
  selectedTemplateTitle: string;
  recordList: recordListType[];
  mediaList: mediaListType[];
  questionList: Question[];
  storedCategoryList: categoryListType[];
  deleteRecordItem: (id: number) => void;
  deleteMediaItem: (id: number) => void;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  setQuestionList: Dispatch<SetStateAction<Question[]>>;
  setStoredCategoryList: (storedCategoryList: categoryListType[]) => void;
};

export const MainContext = React.createContext<ContextType>({
  loginToken: { accessToken: '', refreshToken: '', message: '' },
  recordList: [],
  mediaList: [],
  questionList: [],
  storedCategoryList: [],
  recordModalOpen: false,
  mediaModalOpen: false,
  selectedTemplateTitle: '',
  deleteRecordItem: () => {},
  deleteMediaItem: () => {},
  setRecordModalState: () => {},
  setMediaModalState: () => {},
  setSelectedTemplateTitle: () => {},
  setQuestionList: () => {},
  setStoredCategoryList: () => {},
  addMediaItem: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const { data: tokenData } = useSWR<tokenType>('getToken');
  const [loginToken, setLoginToken] = useState<tokenType>({
    accessToken: '',
    refreshToken: '',
    message: '',
  });

  useEffect(() => {
    if (tokenData) {
      setLoginToken(tokenData);
    }
  }, [tokenData]);

  const [recordModalState, setRecordModalState] = useState(false);
  const [mediaModalState, setMediaModalState] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [storedRecordList, setStoredRecordList] =
    useState<recordListType[]>(recordList);
  const [storedQuestionList, setStoredQuestionList] = useState<Question[]>([]);
  const [storedMediaList, setStoredMediaList] =
    useState<mediaListType[]>(mediaList);

  const [storedCategoryList, setStoredCategoryList] =
    useState<categoryListType[]>(categoryList);

  const deleteRecordItemHandler = (id: number) => {
    setStoredRecordList(storedRecordList.filter(item => item.id !== id));
  };

  const deleteMediaItemHandler = useCallback(
    (id: number) => {
      setStoredMediaList(storedMediaList.filter(item => item.id !== id));
    },
    [storedMediaList]
  );

  const addMediaItem = useCallback(
    (mediaItemWithoutId: Omit<mediaListType, 'id'>) => {
      setStoredMediaList(prevMediaList => [
        ...prevMediaList,
        { id: prevMediaList.length, ...mediaItemWithoutId },
      ]);
    },
    []
  );

  const contextValue: ContextType = {
    loginToken: loginToken,
    recordList: storedRecordList,
    mediaList: storedMediaList,
    questionList: storedQuestionList,
    deleteMediaItem: deleteMediaItemHandler,
    deleteRecordItem: deleteRecordItemHandler,
    recordModalOpen: recordModalState,
    setRecordModalState,
    mediaModalOpen: mediaModalState,
    setMediaModalState: setMediaModalState,
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    setQuestionList: setStoredQuestionList,
    addMediaItem: addMediaItem,
    setStoredCategoryList,
    storedCategoryList,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
