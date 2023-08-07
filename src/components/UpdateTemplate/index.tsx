import { useState } from 'react';

import { updateTemplateAPI } from '@/apis/Template';
import useRecord from '@/hooks/useRecord';
import useRecordDetail from '@/hooks/useRecordDetail';
import { Questions } from '@/types/question.interface';
import { UpdateTemplateType } from '@/types/template.interface';

import UpdateTemplateContent from './UpdateTemplateContent';
import UpdateTemplateFooter from './UpdateTemplateFooter';
import UpdateTemplateTitle from './UpdateTemplateTitle';

type UpdateTemplatePropType = {
  id: number;
};

export default function UpdateTemplate({ id }: UpdateTemplatePropType) {
  const { recordDetailData } = useRecordDetail(id);
  const { recordListData, mutate } = useRecord();
  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: recordDetailData ? recordDetailData.title : '',
    description: recordDetailData ? recordDetailData.description : '',
  });

  const [updateQuestions, setUpdateQuestions] = useState(
    recordDetailData ? recordDetailData.questions : []
  );
  const [addQuestions, setAddQuestions] = useState<Questions[]>([]);
  const [deleteIds] = useState<number[]>([]);

  const handleClickedSaveButton = async (templateId?: number) => {
    const updatedTemplateContent: UpdateTemplateType = {
      title: currTemplateSubHeader.title,
      description: currTemplateSubHeader.description,
      updateQuestions: updateQuestions ? updateQuestions : [],
      addQuestions,
      deleteIds,
    };

    if (templateId) {
      await updateTemplateAPI(templateId, updatedTemplateContent);
    }

    if (recordListData) {
      mutate(
        recordListData.map(listItem => {
          return listItem.id === id
            ? { ...listItem, title: currTemplateSubHeader.title }
            : listItem;
        }),
        true
      );
    }
  };

  if (!recordDetailData) {
    return <></>;
  }

  return (
    <>
      <UpdateTemplateTitle category={recordDetailData.category} />
      <UpdateTemplateContent
        id={id}
        setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        updateQuestions={updateQuestions}
        setUpdateQuestions={setUpdateQuestions}
        addQuestions={addQuestions}
        setAddQuestions={setAddQuestions}
      />
      <UpdateTemplateFooter
        handleClickedSaveButton={handleClickedSaveButton}
        updateQuestions={updateQuestions}
        addQuestions={addQuestions}
        id={id}
      />
    </>
  );
}
