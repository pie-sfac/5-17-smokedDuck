import styled from '@emotion/styled';

type UpdateTemplateTitlePropType = {
  category?: string;
};

export default function UpdateTemplateTitle({
  category,
}: UpdateTemplateTitlePropType) {
  const UpdateTemplateTitle =
    category === 'INTERVIEW' ? '문진 템플릿 수정' : '처치 템플릿 수정';
  return <ModalTitle>{UpdateTemplateTitle}</ModalTitle>;
}

const ModalTitle = styled('div')`
  font-size: 14px;
  margin: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e7e7;
`;
