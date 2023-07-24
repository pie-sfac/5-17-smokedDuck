import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import Modal from '@/components/Common/Modal';
import RecordListContainer from '@/components/Record/RecordListContainer';
import TypeSelector from '@/components/Record/TypeSelector';
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
          {
            <SelectionBoxContainer>
              <SelectionBox
                title={'문진 템플릿'}
                titleDescription={'첫 방문 또는 회원 현재 상태를 체크 합니다.'}
                image={Template}
              />

              <SelectionBox
                title={'처치 템플릿'}
                titleDescription={'수업 시, 작성합니다.'}
                image={Template}
              />
            </SelectionBoxContainer>
          }
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

const SelectionBoxContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
`;
