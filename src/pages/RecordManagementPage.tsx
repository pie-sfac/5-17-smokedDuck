import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import Modal from '@/components/common/Modal';
import RecordListContainer from '@/components/record/RecordListContainer';
import TypeSelector from '@/components/record/TypeSelector';
import { MainContext } from '@/store';

export default function RecordManagementPage() {
  const { recordModalOpen, setRecordModalState } = useContext(MainContext);
  const [templateType, setTemplateType] = useState('history');
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
          width={700}
          height={400}
          title={'템플릿 생성'}
          setIsOpen={setRecordModalState}
        >
          {}
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
