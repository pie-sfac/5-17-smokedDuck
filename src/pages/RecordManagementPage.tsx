import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Template from '@/assets/Template.svg';
import Modal from '@/components/common/Modal';
import SelectionBox from '@/components/common/SelectionBox';

export default function RecordManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        style={{
          width: 146,
          height: 44,
          border: 'none',
          backgroundColor: '#2D62EA',
          color: '#FFFFFF',
        }}
      >
        + 템플릿 추가
      </Button>
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
    </div>
  );
}

const SelectionBoxContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
`;
