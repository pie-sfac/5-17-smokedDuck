import { Button, ButtonGroup, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useContext } from 'react';

import Modal from '@/components/common/Modal';
import { MainContext } from '@/store';

type RecordDeleteModalPropsType = {
  id: number;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RecordDeleteModal({
  id,
  setDeleteModalOpen,
}: RecordDeleteModalPropsType) {
  const { deleteRecordItem } = useContext(MainContext);

  return (
    <Modal width={340} height={180} setIsOpen={setDeleteModalOpen}>
      {
        <DeleteContainer>
          <TitleArea>{'템플릿 삭제'}</TitleArea>
          <TextArea>{'템플릿을 삭제하시겠습니끼?'}</TextArea>
          <ButtonGroup gap="2">
            <GreyButton onClick={() => setDeleteModalOpen(false)}>
              {'취소'}
            </GreyButton>
            <BlueButton onClick={() => deleteRecordItem(id)}>
              {'삭제'}
            </BlueButton>
          </ButtonGroup>
        </DeleteContainer>
      }
    </Modal>
  );
}

const DeleteContainer = styled.section`
  padding: 32px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleArea = styled.h4`
  margin-bottom: 8px;
  font-weight: 800;
`;

const TextArea = styled.div`
  font-size: 14px;
  margin-bottom: 28px;
`;

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
  },
});
const GreyButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#f4f4f4',
    color: '#000',
  },
});
