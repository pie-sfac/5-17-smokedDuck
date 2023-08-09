import { Dispatch, SetStateAction } from 'react';

import Loading from '@/components/Common/Loading';
import UpdateTemplateQuestionSelections from '@/components/UpdateTemplate/UpdateTemplateQuestionSelections';
import UpdateTemplateSelectedQuestionContainer from '@/components/UpdateTemplate/UpdateTemplateSelectedQuestionContainer';
import UpdateTemplateSubHeader from '@/components/UpdateTemplate/UpdateTemplateSubHeader';
import useRecordDetail from '@/hooks/useRecordDetail';
import { Questions, StringQuestionTypes } from '@/types/question.interface';

type TemplateContentProps = {
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string }>
  >;
  totalList: Questions[];
  id: number;
  questionsListHandler: (
    type: StringQuestionTypes,
    tagName: string,
    totalOrder: number
  ) => void;
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
  if (!recordDetailData) {
    return <Loading />;
  }
  const totalOrder =
    recordDetailData.questions.length !== 0
      ? recordDetailData.questions[recordDetailData.questions.length - 1].order
      : 1;

  return (
    <div>
      <>
        <UpdateTemplateSubHeader
          title={recordDetailData.title}
          description={
            recordDetailData.description ? recordDetailData.description : ''
          }
          setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        />
        <UpdateTemplateQuestionSelections
          totalOrder={totalOrder}
          questionsListHandler={questionsListHandler}
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
    </div>
  );
}
