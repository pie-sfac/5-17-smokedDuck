import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { Questions } from '@/types/question.interface';
import { RecordQuestions } from '@/types/recordDetail.interface';

type QuestionContext = {
  questions: Questions | undefined;
  questionList: Questions[];
  newQuestionList: RecordQuestions[];
  setQuestions: Dispatch<SetStateAction<Questions | undefined>>;
  setQuestionList: Dispatch<SetStateAction<Questions[]>>;
  setNewQuestionList: Dispatch<SetStateAction<RecordQuestions[]>>;
};

export const QueustionContext = createContext<QuestionContext>({
  questions: undefined,
  setQuestions: () => {},
  questionList: [],
  setQuestionList: () => {},
  newQuestionList: [],
  setNewQuestionList: () => {},
});

export const QuestionProvider = (props: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Questions>();
  const [storedQuestionList, setStoredQuestionList] = useState<Questions[]>([]);
  const [newQuestionList, setNewQuestionList] = useState<RecordQuestions[]>([]);

  const questionContextValue: QuestionContext = {
    questions,
    setQuestions,
    questionList: storedQuestionList,
    setQuestionList: setStoredQuestionList,
    newQuestionList,
    setNewQuestionList,
  };

  return (
    <QueustionContext.Provider value={questionContextValue}>
      {props.children}
    </QueustionContext.Provider>
  );
};
