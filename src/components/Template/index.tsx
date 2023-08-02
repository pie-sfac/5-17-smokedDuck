import { useContext } from 'react';

import { createTemplate } from '@/apis/Template';
import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import TemplateContent from './TemplateContent';
import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

export default function Template() {
  const { loginToken, questionList, templateContent, setTemplateContent } =
    useContext(MainContext);

  const handleTemplateContent = (id: string, value: string | Questions[]) => {
    templateContent &&
      setTemplateContent({
        ...templateContent,
        [id]: value,
      });
  };

  const handleClickedSaveButton = async () => {
    handleTemplateContent('question', questionList);
    await createTemplate(loginToken.accessToken, templateContent);
  };

  return (
    <>
      <TemplateTitle />
      <TemplateContent onChange={handleTemplateContent} />
      <TemplateFooter handleClickedSaveButton={handleClickedSaveButton} />
    </>
  );
}
