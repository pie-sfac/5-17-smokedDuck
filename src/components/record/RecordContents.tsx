import styled from '@emotion/styled';
import { useContext } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import Loading from '@/components/Common/Loading';
import UpdateQuestion from '@/components/UpdateTemplate/UpdateQuestion';
import useRecordDetail from '@/hooks/useRecordDetail';
import { MainContext } from '@/store';

export default function RecordContents() {
  const { selectedRecordCardId } = useContext(MainContext);
  const { recordQuestions, isLoading } = useRecordDetail(selectedRecordCardId);

  if (isLoading || !recordQuestions) {
    return <Loading />;
  }
  return (
    <ContentContainer
      style={{
        backgroundColor:
          recordQuestions.length !== 0 ? 'rgba(235, 241, 255, 0.26)' : 'none',
      }}
    >
      {recordQuestions.length === 0 ? (
        <EmptyQuestionContainer>
          <img
            src={EmptyQuestion}
            alt="문항 없음 이미지"
            style={{ marginBottom: '0.7rem' }}
          />
          문항이 없습니다.
        </EmptyQuestionContainer>
      ) : (
        recordQuestions.map(question => (
          <UpdateQuestion
            question={question}
            key={Math.random() * 100}
            isCheckOut={true}
          />
        ))
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  width: 940;
  display: flex;
  height: 22rem;
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
