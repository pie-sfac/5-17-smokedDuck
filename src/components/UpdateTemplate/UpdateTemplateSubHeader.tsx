import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';

type UpdateTemplateSubHeaderProps = {
  setCurrTemplateSubHeader: Dispatch<
    SetStateAction<{ title: string; description: string }>
  >;
  title: string;
  description: string;
};

export default function UpdateTemplateSubHeader({
  setCurrTemplateSubHeader,
  title,
  description,
}: UpdateTemplateSubHeaderProps) {
  const [currentTemplateTitle, setCurrentTemplateTitle] = useState(title);
  const [currentTemplateDescription, setCurrentTemplateDescription] =
    useState(description);

  return (
    <TemplateContentContainer>
      <label htmlFor="template-title">템플릿 제목*</label>
      <StyledInput
        type="text"
        name="template-title"
        id="template-title"
        value={currentTemplateTitle}
        required
        onChange={e => {
          setCurrentTemplateTitle(e.target.value);
          setCurrTemplateSubHeader({
            title: e.target.value,
            description: currentTemplateDescription,
          });
        }}
      />
      <br />
      <label htmlFor="template-title">설명</label>
      <StyledInput
        type="text"
        name="template-title"
        id="template-title"
        value={currentTemplateDescription}
        onChange={e => {
          setCurrentTemplateDescription(e.target.value);
          setCurrTemplateSubHeader({
            title: currentTemplateTitle,
            description: e.target.value,
          });
        }}
      />
    </TemplateContentContainer>
  );
}

const TemplateContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 1rem 2rem;
  font-size: 0.9rem;
`;

const StyledInput = styled('input')`
  border-bottom: 1px solid #e7e7e7;
  font-size: 0.9rem;
  margin: 0.2rem;
  padding: 0 0.2rem 0 0.2rem;
  :focus {
    outline: none;
  }
`;
