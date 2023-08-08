import { Dispatch, SetStateAction } from 'react';

import UpdateTemplateQuestionSelections from '@/components/UpdateTemplate/UpdateTemplateQuestionSelections';
import UpdateTemplateSelectedQuestionContainer from '@/components/UpdateTemplate/UpdateTemplateSelectedQuestionContainer';
import UpdateTemplateSubHeader from '@/components/UpdateTemplate/UpdateTemplateSubHeader';
import useRecordDetail from '@/hooks/useRecordDetail';
import { Questions, StringQuestionTypes } from '@/types/question.interface';

import Loading from '../Common/Loading';

type TemplateContentProps = {
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string }>
  >;
  updateQuestions: Questions[];
  addQuestions: Questions[];
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
};

export default function UpdateTemplateContent({
  setCurrTemplateSubHeader,
  questionsListHandler,
  newQuestionContentHandler,
  existQuestionContentHandler,
  updateQuestions,
  addQuestions,
  id,
}: TemplateContentProps) {
  const { recordDetailData } = useRecordDetail(id);
  if (!recordDetailData) {
    return <Loading />;
  }
  const totalOrder =
    recordDetailData.questions[recordDetailData.questions.length - 1].order;

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
          totalQuestions={[...updateQuestions, ...addQuestions]}
          id={id}
        />
      </>
    </div>
  );
}
