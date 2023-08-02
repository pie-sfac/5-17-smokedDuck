import { useContext } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import TemplateContent from './TemplateContent';
import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

export default function Template() {
  const { templateContent, setTemplateContent } = useContext(MainContext);

  const handleTemplateContent = (id: string, value: string | Questions[]) => {
    templateContent &&
      setTemplateContent({
        ...templateContent,
        [id]: value,
      });
  };

  // useEffect(() => {
  //   console.log(templateContent);
  // }, [templateContent]);

  return (
    <>
      <TemplateTitle />
      <TemplateContent onChange={handleTemplateContent} />
      <TemplateFooter onChange={handleTemplateContent} />
    </>
  );
}
