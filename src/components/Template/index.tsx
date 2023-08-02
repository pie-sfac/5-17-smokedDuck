import { useContext } from 'react';

import { createTemplate } from '@/apis/Template';
import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import TemplateContent from './TemplateContent';
import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

type NewTemplateContent = {
  questions: Questions[];
  category?: '' | 'INTERVIEW' | 'TREATMENT' | undefined;
  title?: string | undefined;
  description?: string | undefined;
};

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
    const newTemplateContent: NewTemplateContent = {
      ...templateContent,
      questions: questionList,
    };
    await createTemplate(loginToken.accessToken, newTemplateContent);
  };

  return (
    <>
      <TemplateTitle />
      <TemplateContent onChange={handleTemplateContent} />
      <TemplateFooter handleClickedSaveButton={handleClickedSaveButton} />
    </>
  );
}
