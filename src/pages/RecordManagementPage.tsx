import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import Modal from '@/components/Common/Modal';
import RecordListContainer from '@/components/Record/RecordListContainer';
import TypeSelector from '@/components/Record/TypeSelector';
import Template from '@/components/Template';
import { MainContext } from '@/store';

export default function RecordManagementPage() {
  const {
    recordModalOpen,
    setRecordModalState,
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    setQuestionList,
  } = useContext(MainContext);
  const [templateType, setTemplateType] = useState('history');

  useEffect(() => {
    if (!recordModalOpen) {
      setSelectedTemplateTitle('');
      setQuestionList([]);
    }
  }, [recordModalOpen, setQuestionList, setSelectedTemplateTitle]);

  return (
    <PageContainer>
      <TypeSelector
        templateType={templateType}
        setTemplateType={setTemplateType}
      />
      <RecordListContainer templateType={templateType} />

      {recordModalOpen && (
        <Modal
          width={selectedTemplateTitle.length === 0 ? 700 : undefined}
          height={selectedTemplateTitle.length === 0 ? 400 : undefined}
          setIsOpen={setRecordModalState}
        >
          <Template />
        </Modal>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
`;
