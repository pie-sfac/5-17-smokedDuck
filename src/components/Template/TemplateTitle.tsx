import styled from '@emotion/styled';

type TemplateTitleProps = {
  title: string;
};
export default function TemplateTitle({ title }: TemplateTitleProps) {
  return <ModalTitle>{title.length === 0 ? '템플릿' : title} 생성</ModalTitle>;
}

const ModalTitle = styled('div')`
  font-size: 14px;
  margin: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e7e7;
`;
