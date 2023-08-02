import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Questions } from '@/types/question.interface';
import { Template } from '@/types/template.interface';
import { categoryList, categoryListType } from '@/utils/constants/categoryList';
import { mediaList, mediaListType } from '@/utils/constants/mediaList';

type ContextType = {
  loginToken: string;
  recordModalOpen: boolean;
  mediaModalOpen: boolean;
  addMediaItem: (mediaItemWithoutId: Omit<mediaListType, 'id'>) => void;
  selectedTemplateTitle: string;
  mediaList: mediaListType[];
  questionList: Questions[];
  questions: Questions | undefined;
  setQuestions: Dispatch<SetStateAction<Questions | undefined>>;
  storedCategoryList: categoryListType[];
  selectedRecordCardId: number;
  isRecordEdit: boolean;
  deleteMediaItem: (id: number) => void;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  setQuestionList: Dispatch<SetStateAction<Questions[]>>;
  setStoredCategoryList: (storedCategoryList: categoryListType[]) => void;
  selectedRecordCard: string;
  setSelectedRecordCard: Dispatch<SetStateAction<string>>;
  setLoginToken: Dispatch<SetStateAction<string>>;
  templateContent: Template | undefined;
  setTemplateContent: Dispatch<SetStateAction<Template | undefined>>;
  setSeletedRecordCardId: Dispatch<SetStateAction<number>>;
  setIsRecordEdit: Dispatch<SetStateAction<boolean>>;
};

export const MainContext = React.createContext<ContextType>({
  loginToken: '',
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
    questions: [],
  },
  setTemplateContent: () => {},
  setQuestions: () => {},
  selectedRecordCardId: 0,
  isRecordEdit: false,
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
  setSeletedRecordCardId: () => {},
  setIsRecordEdit: () => {},
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
  const [isRecordEdit, setIsRecordEdit] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [questions, setQuestions] = useState<Questions>();
  const [templateContent, setTemplateContent] = useState<Template>();
  const [storedQuestionList, setStoredQuestionList] = useState<Questions[]>([]);
  const [selectedRecordCard, setSelectedRecordCard] = useState<string>('');
  const [selectedRecordCardId, setSeletedRecordCardId] = useState(0);

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
    questions,
    setQuestions,
    templateContent,
    setTemplateContent,
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
