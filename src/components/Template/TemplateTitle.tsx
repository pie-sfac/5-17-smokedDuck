import styled from '@emotion/styled';
import { useContext } from 'react';

import { MainContext } from '@/store';

export default function TemplateTitle() {
  const { selectedTemplateTitle } = useContext(MainContext);
  return (
    <ModalTitle>
      {selectedTemplateTitle.length === 0 ? '템플릿' : selectedTemplateTitle}{' '}
      생성
    </ModalTitle>
  );
}

const ModalTitle = styled('div')`
  font-size: 14px;
  margin: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e7e7;
`;
