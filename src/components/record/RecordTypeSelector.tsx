import styled from '@emotion/styled';

import { useRecord } from '@/utils/recordData';

type RecordTypeSelectorProps = {
  templateType: string;
  changeListType: (type: string) => void;
};

export default function RecordTypeSelector({
  templateType,
  changeListType,
}: RecordTypeSelectorProps) {
  const { count, isLoading } = useRecord();

  if (isLoading) {
    return <></>;
  }
  return (
    <TypeSelectorArea>
      <TypeContainer
        onClick={() => changeListType('INTERVIEW')}
        className={templateType === 'INTERVIEW' ? 'active' : ''}
      >{`문진(${
        count.interviewCount < 10
          ? '0' + String(count.interviewCount)
          : count.interviewCount
      })`}</TypeContainer>
      <TypeContainer
        onClick={() => changeListType('TREATMENT')}
        className={templateType === 'TREATMENT' ? 'active' : ''}
      >{`처치(${
        count.treatmentCount < 10
          ? '0' + String(count.treatmentCount)
          : count.treatmentCount
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
