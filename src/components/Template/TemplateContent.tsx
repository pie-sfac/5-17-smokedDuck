import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';
import { recordQuestionsType } from '@/types/recordDetail.interface';

import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  isEditMode: boolean | undefined;
  currTemplateSubHeader: { title: string; description?: string | undefined };
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string | undefined }>
  >;
  updateQuestions: recordQuestionsType[] | undefined;
  setUpdateQuestions: React.Dispatch<
    React.SetStateAction<recordQuestionsType[] | undefined>
  >;
  addQuestions: Questions[];
  setAddQuestions: React.Dispatch<React.SetStateAction<Questions[]>>;
  onChange: (id: string, value: string | Questions[]) => void;
};

export default function TemplateContent({
  isEditMode,
  currTemplateSubHeader,
  setCurrTemplateSubHeader,
  setUpdateQuestions,
  addQuestions,
  setAddQuestions,
  onChange,
}: TemplateContentProps) {
  const { selectedTemplateTitle, selectedRecordCard } = useContext(MainContext);

  const [totalQuestionList, setTotalQuestionList] = useState(
    selectedRecordCard ? selectedRecordCard.questions : []
  );

  return (
    <div>
      {selectedTemplateTitle.length === 0 ? (
        <TemplateSelections />
      ) : (
        <>
          <TemplateSubHeader
            currTemplateSubHeader={currTemplateSubHeader}
            setCurrTemplateSubHeader={setCurrTemplateSubHeader}
            onChange={onChange}
          />
          <TemplateQuestionSelections
            totalQuestionList={totalQuestionList}
            setTotalQuestionList={setTotalQuestionList}
            addQuestions={addQuestions}
            setAddQuestions={setAddQuestions}
          />
          <TemplateSelectedQuestionContainer
            isEditMode={isEditMode}
            totalQuestionList={totalQuestionList}
            setUpdateQuestions={setUpdateQuestions}
            setAddQuestions={setAddQuestions}
          />
        </>
      )}
    </div>
  );
}
