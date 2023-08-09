import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';
import { CheckedSpecialQuestions } from '@/types/question.interface';

import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  currTemplateSubHeader: { title: string; description?: string | undefined };
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string | undefined }>
  >;
  onChange: (id: string, value: string | Questions[]) => void;
};

export default function TemplateContent({
  currTemplateSubHeader,
  setCurrTemplateSubHeader,
  onChange,
}: TemplateContentProps) {
  const { selectedTemplateTitle } = useContext(MainContext);

  const [isCheckedSpecialQuestions, setIsCheckedSpecialQuestions] =
    useState<CheckedSpecialQuestions>({
      isPAIN_HSTRY: false,
      isCONDITION: false,
      isPAIN_INTV: false,
    });

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
            isCheckedSpecialQuestions={isCheckedSpecialQuestions}
            setIsCheckedSpecialQuestions={setIsCheckedSpecialQuestions}
          />
          <TemplateSelectedQuestionContainer
            isCheckedSpecialQuestions={isCheckedSpecialQuestions}
            setIsCheckedSpecialQuestions={setIsCheckedSpecialQuestions}
          />
        </>
      )}
    </div>
  );
}
