import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import { MainContext } from '@/store';
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
  const { isRecordEdit } = useContext(MainContext);
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (questionInfo.type) {
      case 'PAIN_HSTRY':
        setTitle('통증 정도');
        return;
        break;
      case 'CONDITION':
        setTitle('오늘의 컨디션');
        return;
        break;
      case 'PAIN_INTV':
        setTitle('통증 문진');
        return;
        break;

      default:
        setTitle(questionInfo.title);
        return;
        break;
    }
  }, [questionInfo.title, questionInfo.type]);
  return (
    <QuestionContainer>
      <RecordDetailItemHeader
        id={questionInfo.id}
        title={title}
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
