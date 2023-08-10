import styled from '@emotion/styled';
import { useCallback, useContext, useEffect } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import { QueustionContext } from '@/store/QuestionProvider';
import { CheckedSpecialQuestions } from '@/types/question.interface';

import Question from './Question';

type TemplateSelectedQuestionContainerProps = {
  isCheckedSpecialQuestions: CheckedSpecialQuestions;
  setIsCheckedSpecialQuestions: React.Dispatch<
    React.SetStateAction<CheckedSpecialQuestions>
  >;
};

export default function TemplateSelectedQuestionContainer({
  setIsCheckedSpecialQuestions,
}: TemplateSelectedQuestionContainerProps) {
  const { questionList, setQuestionList } = useContext(QueustionContext);

  const handleQuestionContent = useCallback(
    (
      order: number,
      valueKey: string,
      value: string | string[] | boolean | number
    ) => {
      if (questionList.length !== 0) {
        const currentUpdatedQuestion = questionList.map(question =>
          question.order === order
            ? { ...question, [valueKey]: value }
            : question
        );
        setQuestionList(currentUpdatedQuestion);
      }
    },
    [questionList, setQuestionList]
  );

  useEffect(() => {
    setQuestionList(prevQuestionList => [
      ...prevQuestionList.sort((a, b) => a.order - b.order),
    ]);
  }, [setQuestionList]);

  return (
    <ContentContainer
      style={{
        backgroundColor:
          questionList.length !== 0 ? 'rgba(235, 241, 255, 0.26)' : 'none',
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
        questionList?.map((question, idx) => (
          <Question
            key={
              questionList
                ? questionList[questionList.length - 1].order +
                  idx +
                  Math.random()
                : idx + Math.random()
            }
            question={question}
            onChange={handleQuestionContent}
            setIsCheckedSpecialQuestions={setIsCheckedSpecialQuestions}
          />
        ))
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  width: 940;
  height: 12rem;
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
    height: 28rem;
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
