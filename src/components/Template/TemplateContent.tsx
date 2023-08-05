import { useContext } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  currTemplateSubHeader: { title: string; description?: string };
  onChange: (id: string, value: string | Questions[]) => void;
};

export default function TemplateContent({
  currTemplateSubHeader,
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
            onChange={onChange}
          />
          <TemplateQuestionSelections />
          <TemplateSelectedQuestionContainer />
        </>
      )}
    </div>
  );
}
