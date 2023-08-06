import { useContext, useState } from 'react';
import { mutate } from 'swr';

import { createTemplate, updateTemplate } from '@/apis/Template';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';
import { UpdateTemplate } from '@/types/template.interface';

import TemplateContent from './TemplateContent';
import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

type TemplateProps = {
  isEditMode?: boolean;
};

type NewTemplateContent = {
  questions: Questions[];
  category?: '' | 'INTERVIEW' | 'TREATMENT' | undefined;
  title?: string | undefined;
  description?: string | undefined;
};

export default function Template({ isEditMode }: TemplateProps) {
  const {
    questionList,
    templateContent,
    setTemplateContent,
    selectedRecordCard,
  } = useContext(MainContext);

  const { recordListData } = useRecord();

  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: selectedRecordCard ? selectedRecordCard.title : '',
    description: selectedRecordCard ? selectedRecordCard.description : '',
  });

  const [updateQuestions, setUpdateQuestions] = useState(
    selectedRecordCard?.questions
  );
  const [addQuestions, setAddQuestions] = useState<Questions[]>([]);
  const [deleteIds] = useState<number[]>([]);

  const handleTemplateContent = (id: string, value: string | Questions[]) => {
    templateContent &&
      setTemplateContent({
        ...templateContent,
        [id]: value,
      });
  };

  const handleClickedSaveButton = async (id?: number) => {
    if (!isEditMode) {
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
    } else {
      const updatedTemplateContent: UpdateTemplate = {
        title: currTemplateSubHeader.title,
        description: currTemplateSubHeader.description,
        updateQuestions: updateQuestions ? updateQuestions : [],
        addQuestions,
        deleteIds,
      };

      if (id) {
        await updateTemplate(id, updatedTemplateContent);
      }
    }
  };

  return (
    <>
      <TemplateTitle />
      <TemplateContent
        isEditMode={isEditMode}
        currTemplateSubHeader={currTemplateSubHeader}
        setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        updateQuestions={updateQuestions}
        setUpdateQuestions={setUpdateQuestions}
        addQuestions={addQuestions}
        setAddQuestions={setAddQuestions}
        onChange={handleTemplateContent}
      />
      <TemplateFooter handleClickedSaveButton={handleClickedSaveButton} />
    </>
  );
}
