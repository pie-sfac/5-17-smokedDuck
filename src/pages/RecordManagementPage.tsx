import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import Modal from '@/components/Common/Modal';
import RecordListContainer from '@/components/Record/RecordListContainer';
import TypeSelector from '@/components/Record/TypeSelector';
import { MainContext } from '@/store';

export default function RecordManagementPage() {
  const { recordModalOpen, setRecordModalState } = useContext(MainContext);
  const [templateType, setTemplateType] = useState('history');
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');

  useEffect(() => {
    if (!recordModalOpen) {
      setSelectedTemplateTitle('');
    }
  }, [recordModalOpen]);

  return (
    <PageContainer>
      <PageTitle>기록 템플릿</PageTitle>
      <TypeSelector
        templateType={templateType}
        setTemplateType={setTemplateType}
      />
      <RecordListContainer templateType={templateType} />

      {recordModalOpen && (
        <Modal
          width={selectedTemplateTitle.length === 0 ? 700 : undefined}
          height={selectedTemplateTitle.length === 0 ? 400 : undefined}
          title={'템플릿 생성'}
          setIsOpen={setRecordModalState}
        >
          <Template
            selectedTemplateTitle={selectedTemplateTitle}
            setSelectedTemplateTitle={setSelectedTemplateTitle}
          />
        </Modal>
      )}
    </PageContainer>
  );
}

const PageTitle = styled.span`
  font-size: 20px;
  font-weight: 800;
  display: block;
  margin: 2rem 0;
  @media screen and (max-height: 750px) {
    margin: 0.5rem 0;
  }
`;

const PageContainer = styled.div`
  margin-top: 2rem;
  position: relative;
  @media screen and (max-height: 750px) {
    margin-top: 1rem;
  }
`;
