import styled from '@emotion/styled';
import { useContext } from 'react';

import { MainContext } from '@/store';
import { recordQuestionsType } from '@/types/recordDetail.interface';

import RecordDetailItemContent from './RecordDetailItemContent';
import RecordDetailItemFooter from './RecordDetailItemFooter';
import RecordDetailItemHeader from './RecordDetailItemHeader';
interface AddedSelection {
  _id: number;
  selectionName: string;
}
type RecordDetailItemPropsType = {
  questionInfo: recordQuestionsType;
  onChange: (
    order: number,
    id: string,
    value: string | AddedSelection[] | boolean
  ) => void;
};

export default function RecordDetailItem({
  questionInfo,
}: RecordDetailItemPropsType) {
  const basicContent = ['TEXT', 'MEDIA', 'SELECT'];
  const isbasic = basicContent.includes(questionInfo.type);
  const { isRecordEdit } = useContext(MainContext);
  return (
    <QuestionContainer>
      <RecordDetailItemHeader
        id={questionInfo.id}
        title={questionInfo.title}
        type={questionInfo.type}
        paragraph={questionInfo.paragraph}
        allowMultiple={questionInfo.allowMultiple}
        isbasic={isbasic}
        isRecordEdit={isRecordEdit}
      />
      {isbasic && (
        <RecordDetailItemContent
          title={questionInfo.title}
          description={questionInfo.description}
          options={questionInfo.options}
          type={questionInfo.type}
          isRecordEdit={isRecordEdit}
          onChange={onchange}
        />
      )}
      <RecordDetailItemFooter isRecordEdit={isRecordEdit} />
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
