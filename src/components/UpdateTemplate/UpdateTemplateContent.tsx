import { Dispatch, SetStateAction } from 'react';

import Loading from '@/components/Common/Loading';
import UpdateTemplateQuestionSelections from '@/components/UpdateTemplate/UpdateTemplateQuestionSelections';
import UpdateTemplateSelectedQuestionContainer from '@/components/UpdateTemplate/UpdateTemplateSelectedQuestionContainer';
import UpdateTemplateSubHeader from '@/components/UpdateTemplate/UpdateTemplateSubHeader';
import { Questions, StringQuestionTypes } from '@/types/question.interface';
import { useRecordDetail } from '@/utils/recordData';

type TemplateContentProps = {
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string }>
  >;
  totalList: Questions[];
  id: number;
  questionsListHandler: (type: StringQuestionTypes, tagName: string) => void;
  newQuestionContentHandler: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
  existQuestionContentHandler: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
  handleDelete: (order: number, isNew: boolean) => void;
  handleMove: (order: number, direction: string) => void;
};

export default function UpdateTemplateContent({
  setCurrTemplateSubHeader,
  questionsListHandler,
  newQuestionContentHandler,
  existQuestionContentHandler,
  totalList,
  id,
  handleDelete,
  handleMove,
}: TemplateContentProps) {
  const { recordDetailData } = useRecordDetail(id);

  return (
    <>
      {!recordDetailData ? (
        <Loading />
      ) : (
        <>
          <UpdateTemplateSubHeader
            title={recordDetailData.title}
            description={
              recordDetailData.description ? recordDetailData.description : ''
            }
            setCurrTemplateSubHeader={setCurrTemplateSubHeader}
          />
          <UpdateTemplateQuestionSelections
            questionsListHandler={questionsListHandler}
            category={recordDetailData.category}
          />
          <UpdateTemplateSelectedQuestionContainer
            newQuestionContentHandler={newQuestionContentHandler}
            existQuestionContentHandler={existQuestionContentHandler}
            totalQuestions={totalList}
            handleDelete={handleDelete}
            handleMove={handleMove}
            id={id}
          />
        </>
      )}
    </>
  );
}
