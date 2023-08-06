import { Button, ButtonGroup, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

import Modal from '@/components/Common/Modal';

type DeleteModalPropsType = {
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  handleDeleteClick: () => Promise<void>;
  setIsDeleteMode?: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteModal({
  setDeleteModalOpen,
  title,
  text,
  handleDeleteClick,
}: DeleteModalPropsType) {
  return (
    <Modal width={340} height={180} setIsOpen={setDeleteModalOpen}>
      {
        <DeleteContainer>
          <TitleArea>{title}</TitleArea>
          <TextArea>{text}</TextArea>
          <ButtonGroup gap="2">
            <GrayButton onClick={() => setDeleteModalOpen(false)}>
              {'취소'}
            </GrayButton>
            <BlueButton onClick={handleDeleteClick}>{'삭제'}</BlueButton>
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
  white-space: pre-line;
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
const GrayButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#f4f4f4',
    color: '#000',
  },
});
