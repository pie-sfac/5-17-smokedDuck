import styled from '@emotion/styled';

type TypeSelectorProps = {
  templateType: string;
  changeListType: (type: string) => void;
  interviewNum: number;
  treatNum: number;
};

export default function TypeSelector({
  templateType,
  changeListType,
  interviewNum,
  treatNum,
}: TypeSelectorProps) {
  return (
    <TypeSelectorArea>
      <TypeContainer
        onClick={() => changeListType('INTERVIEW')}
        className={templateType === 'INTERVIEW' ? 'active' : ''}
      >{`문진(${
        interviewNum < 10 ? '0' + String(interviewNum) : interviewNum
      })`}</TypeContainer>
      <TypeContainer
        onClick={() => changeListType('TREATMENT')}
        className={templateType === 'TREATMENT' ? 'active' : ''}
      >{`처치(${
        treatNum < 10 ? '0' + String(treatNum) : treatNum
      })`}</TypeContainer>
    </TypeSelectorArea>
  );
}

const TypeContainer = styled.button`
  color: #cfcfcf;
  font-weight: 600;
  border-bottom: 0.15rem solid #cfcfcf;
  padding: 0.5rem;
  cursor: pointer;
  &.active {
    color: #6691ff;
    border-bottom: 0.18rem solid #6691ff;
  }
`;

const TypeSelectorArea = styled.div`
  display: flex;
  margin-top: 3rem;
`;
