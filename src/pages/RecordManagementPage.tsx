import { Button, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Template from '@/assets/Template.svg';
import Modal from '@/components/common/Modal';
import SelectionBox from '@/components/common/SelectionBox';
import RecordListContainer from '@/components/record/RecordListContainer';
import TypeSelector from '@/components/record/TypeSelector';

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
