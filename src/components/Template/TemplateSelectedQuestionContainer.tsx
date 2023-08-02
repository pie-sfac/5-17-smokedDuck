import styled from '@emotion/styled';
import { useContext } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import { MainContext } from '@/store';

import Question from '../Question';

interface AddedSelection {
  _id: number;
  selectionName: string;
}

export default function TemplateSelectedQuestionContainer() {
  const { questionList, setQuestionList } = useContext(MainContext);

  const handleQuestionContent = (
    order: number,
    id: string,
    value: string | AddedSelection[] | boolean
  ) => {
    const updatedQuestion = questionList.map(question =>
      question.order === order
        ? { ...question, [id === 'title' ? question.title : id]: value }
        : question
    );

    setQuestionList(updatedQuestion);
  };

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
        questionList.map(question => (
          <Question
            key={question.order}
            order={question.order}
            title={question.title}
            tagName={question.tagName}
            onChange={handleQuestionContent}
          />
        ))
      )}
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
