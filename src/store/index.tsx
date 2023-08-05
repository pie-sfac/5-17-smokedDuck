import React, { Dispatch, SetStateAction, useState } from 'react';

import { Questions } from '@/types/question.interface';
import {
  recordDetailType,
  recordQuestionsType,
} from '@/types/recordDetail.interface';
import { Template } from '@/types/template.interface';
import { categoryList, categoryListType } from '@/utils/constants/categoryList';

type ContextType = {
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
  selectedRecordCard: recordDetailType | undefined;
  setSelectedRecordCard: React.Dispatch<
    React.SetStateAction<recordDetailType | undefined>
  >;
  templateContent: Template | undefined;
  setTemplateContent: Dispatch<SetStateAction<Template | undefined>>;
  setSeletedRecordCardId: Dispatch<SetStateAction<number>>;
  setIsRecordEdit: Dispatch<SetStateAction<boolean>>;
  newQuestionList: recordQuestionsType[];
  setNewQuestionList: Dispatch<SetStateAction<recordQuestionsType[]>>;
  selectedIds: number[];
  setSelectedIds: Dispatch<SetStateAction<number[]>>;
};

export const MainContext = React.createContext<ContextType>({
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
  selectedRecordCard: {
    id: 0,
    category: '',
    title: '',
    description: '',
    questions: [],
    createdAt: '',
    updatedAt: '',
    message: '',
  },
  setSelectedRecordCard: () => {},
  setSeletedRecordCardId: () => {},
  setIsRecordEdit: () => {},

  newQuestionList: [],
  setNewQuestionList: () => {},
  selectedIds: [],
  setSelectedIds: () => {},
  setLoginToken: function (value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.');
  },
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}) {
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
  const [selectedRecordCard, setSelectedRecordCard] =
    useState<recordDetailType>();
  const [selectedRecordCardId, setSeletedRecordCardId] = useState(0);

  const [storedCategoryList, setStoredCategoryList] =
    useState<categoryListType[]>(categoryList);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const contextValue: ContextType = {
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
    selectedIds,
    setSelectedIds,
    setLoginToken: function (value: React.SetStateAction<string>): void {
      throw new Error('Function not implemented.');
    },
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
