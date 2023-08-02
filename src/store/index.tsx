import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Question } from '@/types/question.interface';
import { categoryList, categoryListType } from '@/utils/constants/categoryList';
import { mediaList, mediaListType } from '@/utils/constants/mediaList';

type ContextType = {
  loginToken: string;
  recordModalOpen: boolean;
  mediaModalOpen: boolean;
  addMediaItem: (mediaItemWithoutId: Omit<mediaListType, 'id'>) => void;
  selectedTemplateTitle: string;

  mediaList: mediaListType[];
  questionList: Question[];
  storedCategoryList: categoryListType[];

  deleteMediaItem: (id: number) => void;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  setQuestionList: Dispatch<SetStateAction<Question[]>>;
  setStoredCategoryList: (storedCategoryList: categoryListType[]) => void;
  selectedRecordCard: string;
  setSelectedRecordCard: Dispatch<SetStateAction<string>>;
  setLoginToken: Dispatch<SetStateAction<string>>;
};

export const MainContext = React.createContext<ContextType>({
  loginToken: '',

  mediaList: [],
  questionList: [],
  storedCategoryList: [],
  recordModalOpen: false,
  mediaModalOpen: false,
  selectedTemplateTitle: '',

  deleteMediaItem: () => {},
  setRecordModalState: () => {},
  setMediaModalState: () => {},
  setSelectedTemplateTitle: () => {},
  setQuestionList: () => {},
  setStoredCategoryList: () => {},
  addMediaItem: () => {},
  selectedRecordCard: '',
  setSelectedRecordCard: () => {},
  setLoginToken: () => {},
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
  const [loginToken, setLoginToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoginToken(localStorage.getItem('token')!);
    }
  }, [setLoginToken]);

  const [recordModalState, setRecordModalState] = useState(false);
  const [mediaModalState, setMediaModalState] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [storedQuestionList, setStoredQuestionList] = useState<Question[]>([]);
  const [selectedRecordCard, setSelectedRecordCard] = useState<string>('');

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
    loginToken,
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
    selectedRecordCard,
    setSelectedRecordCard,
    setLoginToken,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
