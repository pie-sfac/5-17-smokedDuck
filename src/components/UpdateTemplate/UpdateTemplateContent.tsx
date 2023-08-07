import styled from '@emotion/styled';

import RecordDetailCheckOutSelection from '@/components/RecordDetailItem/RecordDetailCheckOutSelection';

type QuestionContentProps = {
  title: string;
  description: string;
  options: string[];
  type: string;
  isRecordEdit: boolean;
};

export default function QuestionContent({
  title,
  description,
  options,
  type,
  isRecordEdit,
}: QuestionContentProps) {
  return (
    <QuestionContentContainer>
      <StyledLabel htmlFor="questionTitle">문항 제목</StyledLabel>
      <StyledInput
        type="text"
        name="questionTitle"
        id="questionTitle"
        placeholder="문항 제목을 적어주세요. (최대 50자)"
        style={{
          height: '2.5rem',
          margin: '0.4rem 0 0.4rem 0',
        }}
        value={title}
        title={title}
        disabled={!isRecordEdit}
      />
      <StyledLabel htmlFor="questionDescription">문항 설명</StyledLabel>
      <StyledTextArea
        name="questionDescription"
        id="questionDescription"
        placeholder="문항 설명을 적어주세요. (생략 가능)"
        style={{
          height: '4.2rem',
          margin: '0.4rem 0 0.4rem 0',
        }}
        value={description}
        disabled={!isRecordEdit}
      />
      {type === 'MEDIA' && (
        <AddMediaContainer>
          * 답변자 미디어를 첨부할 수 있습니다.
        </AddMediaContainer>
      )}
      {type === 'SELECT' && <RecordDetailCheckOutSelection options={options} />}
    </QuestionContentContainer>
  );
}

const QuestionContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
`;

const StyledLabel = styled('label')`
  font-size: 0.8rem;
`;

const StyledInput = styled('input')`
  font-size: 0.8rem;
  border: 0.2px solid #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  padding: 0.5rem;
  text-align: top;
  &::placeholder {
    color: #cfcfcf;
    font-size: 0.8rem;
  }
`;

const StyledTextArea = styled('textarea')`
  font-size: 0.8rem;
  border: 0.2px solid #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  padding: 0.5rem;
  &::placeholder {
    color: #cfcfcf;
    font-size: 0.8rem;
  }
`;

const AddMediaContainer = styled('div')`
  display: flex;
  align-items: center;
  color: #aeaeae;
  font-size: 0.8rem;
  margin: 0.2rem;
`;
