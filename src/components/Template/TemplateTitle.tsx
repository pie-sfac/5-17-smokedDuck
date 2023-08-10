import styled from '@emotion/styled';
import { useContext } from 'react';

import { TemplateContext } from '@/store/TemplateProvider';

export default function TemplateTitle() {
  const { selectedTemplateTitle } = useContext(TemplateContext);
  return (
    <ModalTitle>
      {selectedTemplateTitle.length === 0
        ? '템플릿 생성'
        : selectedTemplateTitle}{' '}
    </ModalTitle>
  );
}

const ModalTitle = styled('div')`
  font-size: 16px;
  font-weight: bold;
  margin: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e7e7;
`;
