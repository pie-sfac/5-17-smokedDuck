import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Questions } from '@/types/question.interface';
import { recordQuestionsType } from '@/types/recordDetail.interface';
import { Template } from '@/types/template.interface';
import { categoryList, categoryListType } from '@/utils/constants/categoryList';

type ContextType = {
  loginToken: string;
  recordModalOpen: boolean;
  mediaModalOpen: boolean;
  selectedTemplateTitle: string;
  questionList: Questions[];
  questions: Questions | undefined;
  setQuestions: Dispatch<SetStateAction<Questions | undefined>>;
  storedCategoryList: categoryListType[];
  selectedRecordCardId: number;
  isRecordEdit: boolean;
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
  newQuestionList: recordQuestionsType[];
  setNewQuestionList: Dispatch<SetStateAction<recordQuestionsType[]>>;
};

export const MainContext = React.createContext<ContextType>({
  loginToken: '',
  questionList: [],
  storedCategoryList: [],
  recordModalOpen: false,
  mediaModalOpen: false,
  selectedTemplateTitle: '',
  questions: undefined,
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
  setRecordModalState: () => {},
  setMediaModalState: () => {},
  setSelectedTemplateTitle: () => {},
  setQuestionList: () => {},
  setStoredCategoryList: () => {},
  selectedRecordCard: '',
  setSelectedRecordCard: () => {},
  setLoginToken: () => {},
  setSeletedRecordCardId: () => {},
  setIsRecordEdit: () => {},

  newQuestionList: [],
  setNewQuestionList: () => {},
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

  const [newQuestionList, setNewQuestionList] = useState<recordQuestionsType[]>(
    []
  );
  const [recordModalState, setRecordModalState] = useState(false);
  const [mediaModalState, setMediaModalState] = useState(false);
  const [isRecordEdit, setIsRecordEdit] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [questions, setQuestions] = useState<Questions>();
  const [templateContent, setTemplateContent] = useState<Template>();
  const [storedQuestionList, setStoredQuestionList] = useState<Questions[]>([]);
  const [selectedRecordCard, setSelectedRecordCard] = useState<string>('');
  const [selectedRecordCardId, setSeletedRecordCardId] = useState(0);

  const [storedCategoryList, setStoredCategoryList] =
    useState<categoryListType[]>(categoryList);

  const contextValue: ContextType = {
    loginToken,
    questionList: storedQuestionList,

    recordModalOpen: recordModalState,
    setRecordModalState,
    mediaModalOpen: mediaModalState,
    setMediaModalState: setMediaModalState,
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    setQuestionList: setStoredQuestionList,
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

    newQuestionList,
    setNewQuestionList,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
