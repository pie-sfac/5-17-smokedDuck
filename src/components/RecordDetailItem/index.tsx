import styled from '@emotion/styled';

import { recordQuestionsType } from '@/types/recordDetail.interface';

import RecordDetailItemContent from './RecordDetailItemContent';
import RecordDetailItemFooter from './RecordDetailItemFooter';
import RecordDetailItemHeader from './RecordDetailItemHeader';

type RecordDetailItemPropsType = {
  questionInfo: recordQuestionsType;
};

export default function RecordDetailItem({
  questionInfo,
}: RecordDetailItemPropsType) {
  const basicContent = ['TEXT', 'MEDIA', 'SELECT'];
  const isbasic = basicContent.includes(questionInfo.type);

  return (
    <QuestionContainer>
      <RecordDetailItemHeader
        id={questionInfo.id}
        title={questionInfo.title}
        type={questionInfo.type}
        isbasic={isbasic}
      />
      {isbasic && <RecordDetailItemContent />}
      <RecordDetailItemFooter />
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
