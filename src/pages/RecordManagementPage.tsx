import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import Modal from '@/components/Common/Modal';
import Record from '@/components/Record';
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

  useEffect(() => {
    if (!recordModalOpen) {
      setSelectedTemplateTitle('');
      setQuestionList([]);
    }
  }, [recordModalOpen, setQuestionList, setSelectedTemplateTitle]);

  return (
    <PageContainer>
      <Record />
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
