import { useContext } from 'react';

import { MainContext } from '@/store';

import TemplateFooter from './TemplateFooter';
import TemplateQuestionSelections from './TemplateQuestionSelections';
import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

export default function TemplateContent() {
  const { selectedTemplateTitle } = useContext(MainContext);

  return (
    <div>
      {selectedTemplateTitle.length === 0 ? (
        <TemplateSelections />
      ) : (
        <>
          <TemplateSubHeader />
          <TemplateQuestionSelections />
          <TemplateSelectedQuestionContainer />
          <TemplateFooter />
        </>
      )}
    </div>
  );
}
