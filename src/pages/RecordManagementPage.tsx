import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';

import Modal from '@/components/Common/Modal';
import Record from '@/components/Record';
import Template from '@/components/Template';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';

export default function RecordManagementPage() {
  const {
    recordModalOpen,
    setRecordModalState,
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    setQuestionList,
  } = useContext(MainContext);

  const { recordListData, isLoading } = useRecord();

  useEffect(() => {
    if (!recordModalOpen) {
      setSelectedTemplateTitle('');
      setQuestionList([]);
    }
  }, [recordModalOpen, setQuestionList, setSelectedTemplateTitle]);

  if (isLoading || !recordListData) {
    return <div>Loading...</div>;
  }
  return (
    <PageContainer>
      <Record templates={recordListData} />
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
