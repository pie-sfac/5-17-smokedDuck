import styled from '@emotion/styled';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';

type TemplateSelectedQuestionContainerProps = {
  questions: string[];
};

export default function TemplateSelectedQuestionContainer({
  questions,
}: TemplateSelectedQuestionContainerProps) {
  return (
    <ContentContainer
      style={{
        backgroundColor:
          questions.length !== 0 ? 'rgba(235, 241, 255, 0.26)' : 'none',
      }}
    >
      {questions.length === 0 ? (
        <EmptyQuestionContainer>
          <img
            src={EmptyQuestion}
            alt="문항 없음 이미지"
            style={{ marginBottom: '0.7rem' }}
          />
          문항이 없습니다.
        </EmptyQuestionContainer>
      ) : (
        questions.map(question => <div>{question}</div>)
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  display: flex;
  justify-content: center;
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
