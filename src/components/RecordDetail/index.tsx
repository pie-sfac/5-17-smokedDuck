import styled from '@emotion/styled';

import { recordQuestionType } from '@/types/recordDetail.interface';

import RecordDetailContent from './RecordDetailContent';
import RecordDetailFooter from './RecordDetailFooter';
import RecordDetailHeader from './RecordDetailHeader';

type RecordDetailPropsType = {
  questionInfo: recordQuestionType;
};

export default function RecordDetail({ questionInfo }: RecordDetailPropsType) {
  const basicContent = ['TEXT', 'MEDIA', 'SELECT'];
  return (
    <QuestionContainer>
      <RecordDetailHeader id={questionInfo.id} title={questionInfo.title} />
      {basicContent.includes(questionInfo.type) && <RecordDetailContent />}
      <RecordDetailFooter />
    </QuestionContainer>
  );
}

const QuestionContainer = styled('div')`
  width: 96%;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
`;
