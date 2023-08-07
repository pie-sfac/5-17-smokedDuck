import styled from '@emotion/styled';
import { useContext } from 'react';

import useRecordDetail from '@/hooks/useRecordDetail';
import { MainContext } from '@/store';

export default function RecordDetailTitle() {
  const { isRecordEdit, selectedRecordCardId } = useContext(MainContext);
  const { recordDetailData, isLoading } = useRecordDetail(selectedRecordCardId);

  if (isLoading || !recordDetailData) {
    return <></>;
  }
  return (
    <TemplateContentContainer>
      <label htmlFor="template-title">템플릿 제목*</label>
      <StyledInput
        type="text"
        name="template-title"
        id="template-title"
        disabled={!isRecordEdit}
        value={recordDetailData.title}
      />
      <br />
      <label htmlFor="template-title">설명</label>
      <StyledInput
        type="text"
        name="template-title"
        id="template-title"
        disabled={!isRecordEdit}
        value={recordDetailData.description}
      />
    </TemplateContentContainer>
  );
}

const TemplateContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 1rem 2rem;
  font-size: 0.8rem;
`;

const StyledInput = styled('input')`
  border-bottom: 1px solid #e7e7e7;
  font-size: 0.9rem;
  margin: 0.2rem;
  padding: 0 0.2rem 0 0.2rem;
  :focus {
    outline: none;
  }

  background-color: ${props => (props.disabled ? '#fff' : '#fff')};
`;
