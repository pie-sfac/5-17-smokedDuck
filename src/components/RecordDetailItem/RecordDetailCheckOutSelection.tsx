import styled from '@emotion/styled';

export default function RecordDetailCheckOutSelection({
  options,
}: {
  options: string[];
}) {
  return (
    <>
      <StyledLabel>보기</StyledLabel>
      <AddedSelectionContainer>
        {options.map(optionText => (
          <StyledSelection key={Math.random() * 10000}>
            {optionText}
          </StyledSelection>
        ))}
      </AddedSelectionContainer>
    </>
  );
}
const StyledLabel = styled('label')`
  font-size: 0.8rem;
`;

const StyledSelection = styled('div')`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.4rem;
`;
const AddedSelectionContainer = styled('div')`
  background-color: rgba(244, 244, 244, 0.5);
  border-radius: 10px 10px 10px 10px;
  margin-top: 0.5rem;
  border: 0.2px solid #cfcfcf;
  line-height:;
`;
