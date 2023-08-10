import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

type UpdateQuestionOptionalContentProps = {
  order: number;
  options: string[] | undefined;
  type: string;
  isCheckOut: boolean;
  onChange: (
    order: number,
    id: string,
    value: string | boolean | string[]
  ) => void;
};

export default function UpdateQuestionOptionalContent({
  order,
  options,
  type,
  isCheckOut,
  onChange,
}: UpdateQuestionOptionalContentProps) {
  const [currentOptions, setCurrentOptions] = useState(options);
  const [currentSelection, setCurrentSelection] = useState('');

  const handleAddedOptions = useCallback(
    (currentSelection: string) => {
      setCurrentOptions(prevCurrentOptions => [
        ...(prevCurrentOptions || []),
        currentSelection,
      ]);

      currentOptions?.length !== 0 &&
        onChange(order, 'options', [
          ...(currentOptions || []),
          currentSelection,
        ]);
      setCurrentSelection('');
    },
    [currentOptions, onChange, order]
  );

  const handleDeleteOptions = useCallback(
    (targetId: number) => {
      const deletedOptions = currentOptions?.filter(
        (_, idx) => targetId !== idx
      );
      setCurrentOptions(deletedOptions);
      onChange(order, 'options', deletedOptions ? deletedOptions : []);
    },
    [currentOptions, onChange, order]
  );

  return (
    <>
      {type === 'MEDIA' && (
        <AddMediaContainer>
          * 답변자 미디어를 첨부할 수 있습니다.
        </AddMediaContainer>
      )}

      {type === 'SELECT' && (
        <AddSelectionContainer>
          <StyledLabel htmlFor="questionDescription">보기</StyledLabel>
          <SelectionField>
            <StyledInput
              type="text"
              name="selection"
              id="selection"
              value={currentSelection}
              style={{ width: '100%', height: '2rem' }}
              placeholder="옵션명을 적어주세요."
              onChange={e => setCurrentSelection(e.target.value)}
              disabled={isCheckOut}
            />
            {!isCheckOut && (
              <AddSelectionButton
                onClick={() => {
                  handleAddedOptions(currentSelection);
                }}
              >
                +
              </AddSelectionButton>
            )}
          </SelectionField>
          <AddedSelectionContainer>
            {currentOptions?.map((currentOption, idx) => (
              <StyledSelection
                key={currentOption ? currentOption.length + idx : 1}
              >
                {currentOption}
                {!isCheckOut && (
                  <ChangeMediaButton
                    style={{ marginLeft: '1rem' }}
                    onClick={() => handleDeleteOptions(idx)}
                  >
                    삭제
                  </ChangeMediaButton>
                )}
              </StyledSelection>
            ))}
          </AddedSelectionContainer>
        </AddSelectionContainer>
      )}
    </>
  );
}

const AddMediaContainer = styled('div')`
  display: flex;
  align-items: center;
  color: #aeaeae;
  font-size: 0.8rem;
  margin: 0.2rem;
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
  margin-left: 0.2rem;
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
