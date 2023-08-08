import { Dispatch, SetStateAction, useContext } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  currTemplateSubHeader: { title: string; description: string };
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string }>
  >;
  onChange: (id: string, value: string | Questions[]) => void;
};

export default function TemplateContent({
  currTemplateSubHeader,
  setCurrTemplateSubHeader,
  onChange,
}: TemplateContentProps) {
  const { selectedTemplateTitle } = useContext(MainContext);
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
          <TemplateQuestionSelections />
          <TemplateSelectedQuestionContainer />
        </>
      )}
    </div>
  );
}
