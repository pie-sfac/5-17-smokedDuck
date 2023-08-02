import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';
import Loading from '@/components/Common/Loading';
import RecordDetailItem from '@/components/RecordDetailItem';
import useRecordDetail from '@/hooks/useRecordDetail';
import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

interface AddedSelection {
  _id: number;
  selectionName: string;
}

import Loading from '../Common/Loading';

export default function RecordDetailTemplateContent() {
  const { selectedRecordCardId, questionList, setQuestionList } =
    useContext(MainContext);
  const { recordDetailData, isLoading } = useRecordDetail(selectedRecordCardId);
  const { isRecordEdit } = useContext(MainContext);

  useEffect(() => {
    if (recordDetailData) {
      setQuestionList(
        (recordDetailData.questions as unknown as Questions[]).concat(
          questionList
        )
      );
    }
  }, [questionList, recordDetailData, setQuestionList]);

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
          <RecordDetailItem
            questionInfo={question}
            key={question.id}
            onChange={handleQuestionContent}
          />
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
