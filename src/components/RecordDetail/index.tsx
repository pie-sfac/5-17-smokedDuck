import styled from '@emotion/styled';

import RecordDetailContent from '../Template/RecordDetailTemplateContent';
import RecordDetailFooter from './RecordDetailFooter';
import RecordDetailHeader from './RecordDetailHeader';

type RecordDetailPropsType = {
  _id: number;
  title: string;
  type: string;
};

export default function RecordDetail({
  _id,
  title,
  type,
}: RecordDetailPropsType) {
  const basicContent = ['TEXT', 'MEDIA', 'SELECT'];
  return (
    <QuestionContainer>
      <RecordDetailHeader id={_id} title={title} />
      {basicContent.includes(type) && <RecordDetailContent />}
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
