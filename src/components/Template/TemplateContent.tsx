import { useState } from 'react';

import TemplateFooter from './TemplateFooter';
import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function TemplateContent({
  selectedTemplateTitle,
  setSelectedTemplateTitle,
}: TemplateContentProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  return (
    <div>
      {selectedTemplateTitle.length === 0 ? (
        <TemplateSelections
          setSelectedTemplateTitle={setSelectedTemplateTitle}
        />
      ) : (
        <>
          <TemplateSubHeader />
          <TemplateQuestionSelections setQuestions={setQuestions} />
          <TemplateSelectedQuestionContainer questions={questions} />
          <TemplateFooter questions={questions} />
        </>
      )}
    </div>
  );
}
