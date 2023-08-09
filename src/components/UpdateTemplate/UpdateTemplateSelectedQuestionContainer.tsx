import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import Loading from '@/components/Common/Loading';
import UpdateQuestion from '@/components/UpdateTemplate/UpdateQuestion';
import useRecordDetail from '@/hooks/useRecordDetail';
import { Questions } from '@/types/question.interface';

type UpdateTemplateSelectedQuestionContainerProps = {
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
  totalQuestions: Questions[];
  id: number;
};

export default function UpdateTemplateSelectedQuestionContainer({
  newQuestionContentHandler,
  existQuestionContentHandler,
  handleDelete,
  handleMove,
  totalQuestions,
  id,
}: UpdateTemplateSelectedQuestionContainerProps) {
  const { recordDetailData } = useRecordDetail(id);
  const [questionList, setQuestionList] = useState(totalQuestions);
  useEffect(() => {
    setQuestionList(totalQuestions);
  }, [totalQuestions]);

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
      {questionList.length === 0 ? (
        <EmptyQuestionContainer>
          <img
            src={EmptyQuestion}
            alt="문항 없음 이미지"
            style={{ marginBottom: '0.7rem' }}
          />
          문항이 없습니다.
        </EmptyQuestionContainer>
      ) : (
        questionList.map(question => (
          <UpdateQuestion
            key={question.order}
            question={question}
            onChange={
              question.tagName
                ? newQuestionContentHandler
                : existQuestionContentHandler
            }
            handleDelete={handleDelete}
            handleMove={handleMove}
          />
        ))
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  width: 940;
  height: 22rem;
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
