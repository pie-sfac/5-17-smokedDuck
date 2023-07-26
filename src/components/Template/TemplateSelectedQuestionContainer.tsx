import styled from '@emotion/styled';
import { useContext } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import { MainContext } from '@/store';

import Question from '../Question';

export default function TemplateSelectedQuestionContainer() {
  const { questionList } = useContext(MainContext);

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
            key={question._id}
            _id={question._id}
            title={question.questionTitle}
            tagName={question.tagName}
          />
        ))
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 13rem;
  width: 940;
  margin: 0 2rem 0 2rem;
  overflow: auto;
`;

const EmptyQuestionContainer = styled('div')`
  width: 7em;
  height: 7rem;
  color: #aeaeae;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
