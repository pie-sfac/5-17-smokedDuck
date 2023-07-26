import TemplateSelectedQuestionContainer from './TemplateSelectedQuestionContainer';
import TemplateSubHeader from './TemplateSubHeader';
import TemplateTitle from './TemplateTitle';

export default function CheckOutRecordTemplate() {
  return (
    <>
      <TemplateTitle />
      <TemplateSubHeader />
      <TemplateSelectedQuestionContainer questions={[]} />
    </>
  );
}
