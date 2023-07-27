import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useState } from 'react';

type QuestionContentProps = {
  title: string;
};

export default function QuestionContent({ title }: QuestionContentProps) {
  const [addedFile, setAddedFile] = useState<File>();

  const handleAddedFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== undefined && e.target.files !== null) {
      setAddedFile(e.target.files[0]);
    }
  }, []);

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
      {title === '미디어' && (
        <AddMediaContainer>
          <AddMediaButton>
            <label htmlFor="mediaFile">+ 답변자 미디어 첨부</label>
            <input
              type="file"
              name="mediaFile"
              id="mediaFile"
              onChange={e => handleAddedFile(e)}
              style={{ display: 'none' }}
            />
          </AddMediaButton>
          {addedFile !== undefined && (
            <div>
              <ChangeMediaButton onClick={() => setAddedFile(undefined)}>
                파일 변경
              </ChangeMediaButton>
              {addedFile?.name}
            </div>
          )}
        </AddMediaContainer>
      )}
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

const AddMediaContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const AddMediaButton = styled('div')`
  width: 18rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: normal;
  background-color: rgba(244, 244, 244, 0.5);
  border: 1px dashed #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  margin: 0.5rem 0.5rem 0.5rem 0;
  :hover {
    cursor: pointer;
  }
`;

const ChangeMediaButton = styled('button')`
  background-color: #ebf1ff;
  font-weight: normal;
  font-size: 0.5rem;
  margin-right: 0.4rem;
  padding: 0.3rem;
  border-radius: 10px 10px 10px 10px;
`;
