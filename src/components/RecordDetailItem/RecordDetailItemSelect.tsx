import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

interface AddedSelection {
  _id: number;
  selectionName: string;
}

export default function RecordDetailItemSelect() {
  const [currentSelection, setCurrentSelection] = useState('');
  const [addedSelections, setAddedSelections] = useState<AddedSelection[]>([]);
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
  );
}

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

const StyledLabel = styled('label')`
  font-size: 0.8rem;
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
  cursor: ${props => (props.disabled ? 'inherit' : 'transparent')};
  color: ${props => (props.disabled ? '#e6e6e6' : '#fff')};
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
