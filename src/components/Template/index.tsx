import { useContext, useState } from 'react';
import { mutate } from 'swr';

import { createTemplate } from '@/apis/Template';
import useRecord from '@/hooks/useRecord';
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
  const {
    questionList,
    templateContent,
    setTemplateContent,
    selectedTemplateTitle,
  } = useContext(MainContext);

  const { recordListData } = useRecord();

  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: '',
    description: '',
  });

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

    const newRecordListData = [
      ...(recordListData || []),
      {
        id: recordListData
          ? recordListData[recordListData?.length - 1].id + 1
          : 1,
        category: newTemplateContent.category,
        title: newTemplateContent.title,
        description: newTemplateContent.description,
        createdAt: 'temporary',
        updatedAt: 'temporary',
      },
    ];

    await createTemplate(newTemplateContent);

    mutate('record-templates', newRecordListData, false);
  };

  return (
    <>
      <TemplateTitle />
      <TemplateContent
        currTemplateSubHeader={currTemplateSubHeader}
        setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        onChange={handleTemplateContent}
      />
      {selectedTemplateTitle && (
        <TemplateFooter handleClickedSaveButton={handleClickedSaveButton} />
      )}
    </>
  );
}
