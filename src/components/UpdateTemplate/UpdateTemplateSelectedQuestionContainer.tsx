import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import useRecordDetail from '@/hooks/useRecordDetail';
import { Questions } from '@/types/question.interface';
import { recordQuestionsType } from '@/types/recordDetail.interface';

import Loading from '../Common/Loading';
import UpdateQuestion from './UpdateQuestion';

type UpdateTemplateSelectedQuestionContainerProps = {
  updateQuestions: recordQuestionsType[];
  setUpdateQuestions: React.Dispatch<
    React.SetStateAction<recordQuestionsType[]>
  >;
  setAddQuestions: React.Dispatch<React.SetStateAction<Questions[]>>;
  addQuestions: Questions[];
  id: number;
};

export default function UpdateTemplateSelectedQuestionContainer({
  updateQuestions,
  setUpdateQuestions,
  setAddQuestions,
  addQuestions,
  id,
}: UpdateTemplateSelectedQuestionContainerProps) {
  const { recordDetailData } = useRecordDetail(id);

  const handleQuestionContent = useCallback(
    (order: number, valueKey: string, value: string | string[] | boolean) => {
      if (recordDetailData) {
        const currentUpdatedQuestion = recordDetailData.questions.map(
          question =>
            question.order === order
              ? { ...question, [valueKey]: value }
              : question
        );
        setUpdateQuestions(currentUpdatedQuestion);
      }
    },
    [recordDetailData, setUpdateQuestions]
  );

  const handleNewQuestionContent = useCallback(
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

  useEffect(
    () =>
      setUpdateQuestions(prevQuestions => [
        ...prevQuestions.sort((a, b) => a.order - b.order),
      ]),
    [setUpdateQuestions]
  );
  if (!recordDetailData) {
    return (
      <ContentContainer
        style={{
          backgroundColor: 'none',
        }}
      >
        <Loading />
      </ContentContainer>
    );
  }

  return (
    <ContentContainer
      style={{
        backgroundColor:
          recordDetailData.questions.length !== 0
            ? 'rgba(235, 241, 255, 0.26)'
            : 'none',
      }}
    >
      {recordDetailData.questions.length === 0 ? (
        <EmptyQuestionContainer>
          <img
            src={EmptyQuestion}
            alt="문항 없음 이미지"
            style={{ marginBottom: '0.7rem' }}
          />
          문항이 없습니다.
        </EmptyQuestionContainer>
      ) : (
        updateQuestions.map(question => (
          <UpdateQuestion
            key={question.order}
            question={question}
            onChange={handleQuestionContent}
          />
        ))
      )}
      {addQuestions.length !== 0 &&
        addQuestions.map(question => (
          <UpdateQuestion
            key={question.order}
            question={{ ...question, id: question.order }}
            onChange={handleNewQuestionContent}
          />
        ))}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  width: 940;
  height: 13rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 2rem 0 2rem;
  padding-top: 1rem;
  border: 1px solid rgba(235, 241, 255, 0.26);
  border-radius: 10px 10px 10px 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-height: 800px) {
    height: 18rem;
    margin-bottom: 1rem;
  }
`;

const EmptyQuestionContainer = styled('div')`
  width: 7em;
  height: 100%;
  color: #aeaeae;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
