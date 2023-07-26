import { useContext, useState } from 'react';

import { MainContext } from '@/store';

import TemplateFooter from './TemplateFooter';
import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

export default function TemplateContent() {
  const { selectedTemplateTitle } = useContext(MainContext);
  const [questions, setQuestions] = useState<string[]>([]);

  return (
    <div>
      {selectedTemplateTitle.length === 0 ? (
        <TemplateSelections />
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
