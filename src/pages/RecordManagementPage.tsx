import { Button, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Modal from '@/components/common/Modal';
import RecordListContainer from '@/components/RecordListContainer';
import TypeSelector from '@/components/TypeSelector';

export default function RecordManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [templateType, setTemplateType] = useState('history');
  return (
    <PageContainer>
      <PageTitle>기록 템플릿</PageTitle>
      <TypeSelector
        templateType={templateType}
        setTemplateType={setTemplateType}
      />
      <RecordListContainer templateType={templateType} />

      <BlueButton onClick={() => setIsOpen(true)}>+ 템플릿 추가</BlueButton>
      {isOpen && (
        <Modal
          width={700}
          height={400}
          title={'템플릿 생성'}
          setIsOpen={setIsOpen}
        >
          {}
        </Modal>
      )}
    </PageContainer>
  );
}

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
    position: 'absolute',
    bottom: '-3.5rem',
    right: '0',
  },
});

const PageTitle = styled.span`
  font-size: 20px;
  font-weight: 800;
  display: block;
  margin: 2rem 0;
`;

const PageContainer = styled.div`
  margin-top: 2rem;
  position: relative;
`;
