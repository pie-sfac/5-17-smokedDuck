import styled from '@emotion/styled';

import { Questions } from '@/types/question.interface';

type TemplateSubHeaderProps = {
  onChange: (id: string, value: string | Questions[]) => void;
};

export default function TemplateSubHeader({
  onChange,
}: TemplateSubHeaderProps) {
  return (
    <TemplateContentContainer>
      <label htmlFor="template-title">템플릿 제목*</label>
      <StyledInput
        type="text"
        name="template-title"
        id="template-title"
        required
        onChange={e => onChange('title', e.target.value)}
      />
      <br />
      <label htmlFor="template-title">설명</label>
      <StyledInput
        type="text"
        name="template-title"
        id="template-title"
        onChange={e => onChange('description', e.target.value)}
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
`;
