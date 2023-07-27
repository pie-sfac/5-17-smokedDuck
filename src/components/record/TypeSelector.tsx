import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
type TypeSelectorProps = {
  templateType: string;
  setTemplateType: Dispatch<SetStateAction<string>>;
};

export default function TypeSelector({
  templateType,
  setTemplateType,
}: TypeSelectorProps) {
  return (
    <TypeSelectorArea>
      <TypeContainer
        onClick={() => setTemplateType('history')}
        className={templateType === 'history' ? 'active' : ''}
      >{`문진(00)`}</TypeContainer>
      <TypeContainer
        onClick={() => setTemplateType('treatment')}
        className={templateType === 'treatment' ? 'active' : ''}
      >{`처치(00)`}</TypeContainer>
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
