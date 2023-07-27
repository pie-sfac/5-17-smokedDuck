import styled from '@emotion/styled';

type QuestionContentProps = {
  title: string;
};

export default function QuestionContent({ title }: QuestionContentProps) {
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
      />
      {title === '미디어' && <div>+ 답변자 미디어 첨부</div>}
      {title === '선택형' && <div>보기 추가</div>}
    </QuestionContentContainer>
  );
}

const QuestionContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 0.5rem 0;
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
