import styled from '@emotion/styled';
import { useContext } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import RecordDetailItem from '@/components/RecordDetailItem';
import useRecordDetail from '@/hooks/useRecordDetail';
import { MainContext } from '@/store';

import Loading from '../Common/Loading';

export default function RecordDetailTemplateContent() {
  const { selectedRecordCardId } = useContext(MainContext);
  const { recordDetailData, isLoading } = useRecordDetail(selectedRecordCardId);
  const { isRecordEdit } = useContext(MainContext);

  if (isLoading || !recordDetailData) {
    return <Loading />;
  }
  return (
    <ContentContainer
      style={{
        backgroundColor:
          recordDetailData.questions.length !== 0
            ? 'rgba(235, 241, 255, 0.26)'
            : 'none',
        height: isRecordEdit ? '13rem' : '28rem',
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
        recordDetailData.questions.map(question => (
          <RecordDetailItem questionInfo={question} key={question.id} />
        ))
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled('div')`
  width: 940;
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
