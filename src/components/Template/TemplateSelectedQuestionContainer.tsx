import styled from '@emotion/styled';
import { useCallback, useContext, useEffect } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';
import { recordQuestionsType } from '@/types/recordDetail.interface';

import Question from '../Question';

const basicQuestion = ['TEXT', 'MEDIA', 'SELECT'];

type TemplateSelectedQuestionContainerProps = {
  isEditMode: boolean | undefined;
  totalQuestionList: recordQuestionsType[];
  setUpdateQuestions: React.Dispatch<
    React.SetStateAction<recordQuestionsType[] | undefined>
  >;
  setAddQuestions: React.Dispatch<React.SetStateAction<Questions[]>>;
};

export default function TemplateSelectedQuestionContainer({
  isEditMode,
  totalQuestionList,
  setUpdateQuestions,
  setAddQuestions,
}: TemplateSelectedQuestionContainerProps) {
  const { questionList, setQuestionList } = useContext(MainContext);

  const handleQuestionContent = useCallback(
    (order: number, id: string, value: string | string[] | boolean) => {
      const currentUpdatedQuestion = questionList.map(question =>
        question.order === order
          ? { ...question, [id === 'title' ? question.title : id]: value }
          : question
      );

      setQuestionList(currentUpdatedQuestion);
      setAddQuestions(currentUpdatedQuestion);
      if (isEditMode) {
        const currentUpdatedQuestion = totalQuestionList?.map(updateQuestion =>
          updateQuestion.order === order
            ? {
                ...updateQuestion,
                [id === 'title' ? updateQuestion.title : id]: value,
              }
            : updateQuestion
        );
        setUpdateQuestions(currentUpdatedQuestion);
      }
    },
    [
      isEditMode,
      questionList,
      setAddQuestions,
      setQuestionList,
      setUpdateQuestions,
      totalQuestionList,
    ]
  );

  useEffect(
    () => setQuestionList([...questionList.sort((a, b) => a.order - b.order)]),
    [questionList, setQuestionList]
  );

  return (
    <ContentContainer
      style={{
        backgroundColor:
          questionList.length !== 0 ? 'rgba(235, 241, 255, 0.26)' : 'none',
      }}
    >
      {questionList.length === 0 && totalQuestionList.length === 0 ? (
        <EmptyQuestionContainer>
          <img
            src={EmptyQuestion}
            alt="문항 없음 이미지"
            style={{ marginBottom: '0.7rem' }}
          />
          문항이 없습니다.
        </EmptyQuestionContainer>
      ) : (
        questionList?.map(question => (
          <Question
            key={question.order}
            order={question.order}
            title={question.title}
            tagName={question.tagName}
            onChange={handleQuestionContent}
          />
        ))
      )}
      {totalQuestionList &&
        totalQuestionList.map(currentQuestion => (
          <Question
            key={currentQuestion.order}
            order={currentQuestion.order}
            title={currentQuestion.title}
            tagName={
              basicQuestion.includes(currentQuestion.type) ? '기본' : '전문'
            }
            type={currentQuestion.type}
            onChange={handleQuestionContent}
            required={currentQuestion.required}
            description={currentQuestion.description}
            paragraph={currentQuestion.paragraph}
            options={currentQuestion.options}
            allowMultiple={currentQuestion.allowMultiple}
            addOtherOption={currentQuestion.addOtherOption}
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
