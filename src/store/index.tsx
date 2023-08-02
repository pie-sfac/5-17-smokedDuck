import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';

import { Questions } from '@/types/question.interface';
import { Template } from '@/types/template.interface';
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
  recordListData: recordListType[];
  mediaList: mediaListType[];
  questionList: Questions[];
  questions: Questions | undefined;
  setQuestions: Dispatch<SetStateAction<Questions | undefined>>;
  storedCategoryList: categoryListType[];
  deleteRecordItem: (id: number) => void;
  deleteMediaItem: (id: number) => void;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  setQuestionList: Dispatch<SetStateAction<Questions[]>>;
  setStoredCategoryList: (storedCategoryList: categoryListType[]) => void;
  selectedRecordCard: string;
  setSelectedRecordCard: Dispatch<SetStateAction<string>>;
  templateContent: Template | undefined;
  setTemplateContent: Dispatch<SetStateAction<Template | undefined>>;
};

export const MainContext = React.createContext<ContextType>({
  loginToken: { accessToken: '', refreshToken: '', message: '' },
  recordListData: [],
  mediaList: [],
  questionList: [],
  storedCategoryList: [],
  recordModalOpen: false,
  mediaModalOpen: false,
  selectedTemplateTitle: '',
  questions: {
    type: '',
    order: 0,
    title: '',
    tagName: '',
    description: '',
    required: false,
    paragraph: false,
    options: [],
    allowMultiple: false,
    addOtherOption: false,
  },
  templateContent: {
    category: '',
    title: '',
    description: '',
    question: [],
  },
  setTemplateContent: () => {},
  setQuestions: () => {},
  deleteRecordItem: () => {},
  deleteMediaItem: () => {},
  setRecordModalState: () => {},
  setMediaModalState: () => {},
  setSelectedTemplateTitle: () => {},
  setQuestionList: () => {},
  setStoredCategoryList: () => {},
  addMediaItem: () => {},
  selectedRecordCard: '',
  setSelectedRecordCard: () => {},
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
  const [questions, setQuestions] = useState<Questions>();
  const [templateContent, setTemplateContent] = useState<Template>();
  const [storedQuestionList, setStoredQuestionList] = useState<Questions[]>([]);
  const [selectedRecordCard, setSelectedRecordCard] = useState<string>('');

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
    recordListData: storedRecordList,
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
    selectedRecordCard,
    setSelectedRecordCard,
    questions,
    setQuestions,
    templateContent,
    setTemplateContent,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
