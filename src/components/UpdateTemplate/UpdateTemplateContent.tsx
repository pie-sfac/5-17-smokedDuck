import { Dispatch, SetStateAction } from 'react';

import UpdateTemplateQuestionSelections from '@/components/UpdateTemplate/UpdateTemplateQuestionSelections';
import UpdateTemplateSelectedQuestionContainer from '@/components/UpdateTemplate/UpdateTemplateSelectedQuestionContainer';
import UpdateTemplateSubHeader from '@/components/UpdateTemplate/UpdateTemplateSubHeader';
import useRecordDetail from '@/hooks/useRecordDetail';
import { Questions } from '@/types/question.interface';
import { recordQuestionsType } from '@/types/recordDetail.interface';

import Loading from '../Common/Loading';

type TemplateContentProps = {
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string | undefined }>
  >;
  updateQuestions: recordQuestionsType[];
  setUpdateQuestions: React.Dispatch<
    React.SetStateAction<recordQuestionsType[]>
  >;
  addQuestions: Questions[];
  setAddQuestions: React.Dispatch<React.SetStateAction<Questions[]>>;
  id: number;
};

export default function UpdateTemplateContent({
  setCurrTemplateSubHeader,
  updateQuestions,
  setUpdateQuestions,
  addQuestions,
  setAddQuestions,
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
          id={id}
          setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        />
        <UpdateTemplateQuestionSelections
          addQuestions={addQuestions}
          setAddQuestions={setAddQuestions}
          totalOrder={totalOrder}
        />
        <UpdateTemplateSelectedQuestionContainer
          updateQuestions={updateQuestions}
          setUpdateQuestions={setUpdateQuestions}
          setAddQuestions={setAddQuestions}
          addQuestions={addQuestions}
          id={id}
        />
      </>
    </div>
  );
}
