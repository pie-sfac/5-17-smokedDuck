import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

type QuestionContentProps = {
  title: string;
};

interface AddedSelection {
  _id: number;
  selectionName: string;
}

export default function QuestionContent({ title }: QuestionContentProps) {
  const [addedFile, setAddedFile] = useState<File>();
  const [currentSelection, setCurrentSelection] = useState('');
  const [addedSelections, setAddedSelections] = useState<AddedSelection[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddedFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== undefined && e.target.files !== null) {
      setAddedFile(e.target.files[0]);
    }
  }, []);

  const handleAddedSelections = useCallback(() => {
    setAddedSelections(prevAddedSelections => [
      ...prevAddedSelections,
      {
        _id:
          prevAddedSelections.length === 0 ? 1 : prevAddedSelections.length + 1,
        selectionName: currentSelection,
      },
    ]);
    setCurrentSelection('');
  }, [currentSelection]);

  const handleDeleteSelection = useCallback((targetId: number) => {
    setAddedSelections(prevAddedSelections =>
      prevAddedSelections.filter(selection => selection._id !== targetId)
    );
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
          <AddMediaButton
            htmlFor="mediaFile"
            onClickCapture={e => {
              e.stopPropagation();
            }}
            onClick={() => {
              if (fileInputRef !== null && fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            + 답변자 미디어 첨부
            <input
              type="file"
              name="mediaFile"
              id="mediaFile"
              accept="image/*, video/*"
              onChange={e => {
                handleAddedFile(e);
              }}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </AddMediaButton>
          {addedFile !== undefined && (
            <>
              <ChangeMediaButton onClick={() => setAddedFile(undefined)}>
                파일 변경
              </ChangeMediaButton>
              {addedFile?.name}
            </>
          )}
        </AddMediaContainer>
      )}
      {title === '선택형' && (
        <AddSelectionContainer>
          <StyledLabel htmlFor="questionDescription">보기</StyledLabel>
          <SelectionField>
            <StyledInput
              type="text"
              name="selection"
              id="selection"
              value={currentSelection}
              style={{ width: '95%', height: '2rem' }}
              placeholder="옵션명을 적어주세요."
              onChange={e => setCurrentSelection(e.target.value)}
            />
            <AddSelectionButton onClick={handleAddedSelections}>
              +
            </AddSelectionButton>
          </SelectionField>
          {addedSelections.length !== 0 && (
            <AddedSelectionContainer>
              {addedSelections.map(addedSelection => (
                <StyledSelection key={addedSelection._id}>
                  {addedSelection.selectionName}
                  <ChangeMediaButton
                    style={{ marginLeft: '1rem' }}
                    onClick={() => handleDeleteSelection(addedSelection._id)}
                  >
                    삭제
                  </ChangeMediaButton>
                </StyledSelection>
              ))}
            </AddedSelectionContainer>
          )}
        </AddSelectionContainer>
      )}
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
`;

const AddMediaButton = styled('label')`
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

const AddSelectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const SelectionField = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const AddSelectionButton = styled('button')`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
  background-color: #f4f4f4;
  padding: 0;
`;

const AddedSelectionContainer = styled('div')`
  background-color: rgba(244, 244, 244, 0.5);
  border-radius: 10px 10px 10px 10px;
  margin-top: 1rem;
`;

const StyledSelection = styled('div')`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 1rem 1rem 1rem;
`;
