import { useCallback, useState } from 'react';

import { updateTemplateAPI } from '@/apis/Template';
import useRecord from '@/hooks/useRecord';
import { Questions, StringQuestionTypes } from '@/types/question.interface';
import { recordDetailType } from '@/types/recordDetail.interface';
import { UpdateTemplateType } from '@/types/template.interface';

import UpdateTemplateContent from './UpdateTemplateContent';
import UpdateTemplateFooter from './UpdateTemplateFooter';
import UpdateTemplateTitle from './UpdateTemplateTitle';

type UpdateTemplatePropType = {
  id: number;
  recordDetailData: recordDetailType;
};

export default function UpdateTemplate({
  id,
  recordDetailData,
}: UpdateTemplatePropType) {
  const { recordListData, mutate: mutateTitle } = useRecord();

  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: recordDetailData.title,
    description: recordDetailData.description
      ? recordDetailData.description
      : '',
  });
  const [updateQuestions, setUpdateQuestions] = useState<Questions[]>(
    recordDetailData.questions
  );
  const [addQuestions, setAddQuestions] = useState<Questions[]>([]);

  //저장버튼 누를때 PUT 요청
  const handleClickedSaveButton = async (templateId?: number) => {
    const updatedTemplateContent: UpdateTemplateType = {
      title: currTemplateSubHeader.title,
      description: currTemplateSubHeader.description,
      updateQuestions: updateQuestions ? updateQuestions : [],
      addQuestions,
    };

    if (templateId) {
      await updateTemplateAPI(templateId, updatedTemplateContent);
    }

    if (recordListData) {
      mutateTitle(
        recordListData.map(listItem => {
          return listItem.id === id
            ? { ...listItem, title: currTemplateSubHeader.title }
            : listItem;
        }),
        true
      );
    }
  };

  //문항 박스들 클릭하면 questionList에 담는함수
  const questionsListHandler = (
    type: StringQuestionTypes,
    tagName: string,
    totalOrder: number
  ) => {
    setAddQuestions([
      ...addQuestions,
      {
        id: 0,
        type,
        order:
          addQuestions.length === 0
            ? totalOrder + 1
            : addQuestions[addQuestions.length - 1].order + 1,
        required: false,
        title: '',
        tagName,
        description: '',
        paragraph: false,
        options: [],
        allowMultiple: false,
        addOtherOption: false,
      },
    ]);
  };
  //기존의 항목들 수정하는 함수
  const existQuestionContentHandler = useCallback(
    (order: number, valueKey: string, value: string | string[] | boolean) => {
      const currentUpdatedQuestion = updateQuestions.map(question =>
        question.order === order ? { ...question, [valueKey]: value } : question
      );
      setUpdateQuestions(currentUpdatedQuestion);
    },

    [updateQuestions]
  );

  //새로운 항목을 수정하는 함수
  const newQuestionContentHandler = useCallback(
    (order: number, valueKey: string, value: string | string[] | boolean) => {
      if (addQuestions.length !== 0) {
        const currentUpdatedQuestion = addQuestions.map(question =>
          question.order === order
            ? { ...question, [valueKey]: value }
            : question
        );
        setAddQuestions(currentUpdatedQuestion);
      }
    },
    [addQuestions, setAddQuestions]
  );

  return (
    <>
      <UpdateTemplateTitle id={id} isEditing={true} />
      <UpdateTemplateContent
        id={id}
        setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        questionsListHandler={questionsListHandler}
        newQuestionContentHandler={newQuestionContentHandler}
        existQuestionContentHandler={existQuestionContentHandler}
        updateQuestions={updateQuestions}
        addQuestions={addQuestions}
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
