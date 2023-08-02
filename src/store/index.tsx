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

type ContextType = {
  loginToken: tokenType;
  recordModalOpen: boolean;
  mediaModalOpen: boolean;
  addMediaItem: (mediaItemWithoutId: Omit<mediaListType, 'id'>) => void;
  selectedTemplateTitle: string;
  mediaList: mediaListType[];
  questionList: Question[];
  storedCategoryList: categoryListType[];
  selectedRecordCardId: number;
  isRecordEdit: boolean;
  deleteMediaItem: (id: number) => void;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  setQuestionList: Dispatch<SetStateAction<Question[]>>;
  setStoredCategoryList: (storedCategoryList: categoryListType[]) => void;
  setSeletedRecordCardId: Dispatch<SetStateAction<number>>;
  setIsRecordEdit: Dispatch<SetStateAction<boolean>>;
};

export const MainContext = React.createContext<ContextType>({
  loginToken: { accessToken: '', refreshToken: '', message: '' },
  mediaList: [],
  questionList: [],
  storedCategoryList: [],
  recordModalOpen: false,
  mediaModalOpen: false,
  selectedTemplateTitle: '',
  selectedRecordCardId: 0,
  isRecordEdit: false,
  deleteMediaItem: () => {},
  setRecordModalState: () => {},
  setMediaModalState: () => {},
  setSelectedTemplateTitle: () => {},
  setQuestionList: () => {},
  setStoredCategoryList: () => {},
  addMediaItem: () => {},
  setSeletedRecordCardId: () => {},
  setIsRecordEdit: () => {},
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
  const [isRecordEdit, setIsRecordEdit] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [selectedRecordCardId, setSeletedRecordCardId] = useState(0);
  const [storedQuestionList, setStoredQuestionList] = useState<Question[]>([]);

  const [storedMediaList, setStoredMediaList] =
    useState<mediaListType[]>(mediaList);

  const [storedCategoryList, setStoredCategoryList] =
    useState<categoryListType[]>(categoryList);

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
    mediaList: storedMediaList,
    questionList: storedQuestionList,
    deleteMediaItem: deleteMediaItemHandler,
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
    selectedRecordCardId,
    setSeletedRecordCardId,
    setIsRecordEdit,
    isRecordEdit,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
