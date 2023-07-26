import styled from '@emotion/styled';
import { useMemo, useState } from 'react';

import HambergerDot from '@/assets/hamburgerDots.svg';
import DeleteModal from '@/components/common/DeleteModal';

import Modal from './Modal';

type EditBoxProps = {
  top?: number;
  right?: number;
  bottom?: number;
  id: number;
};

export default function EditBox({ top, right, bottom, id }: EditBoxProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const EditBoxStyle = useMemo(
    () => ({
      top,
      right,
      bottom,
    }),
    [top, right, bottom]
  );

  return (
    <>
      <EditContainer onClick={() => setEditOpen(!editOpen)}>
        <ImgContainer src={HambergerDot} alt="편집/삭제버튼" />
        {editOpen && (
          <EditItemArea style={{ ...EditBoxStyle }}>
            <EditItem onClick={() => setEditModalOpen(true)}>편집</EditItem>
            <EditItem onClick={() => setDeleteModalOpen(true)}>삭제</EditItem>
          </EditItemArea>
        )}
      </EditContainer>
      {editModalOpen && (
        <Modal title={'템플릿 수정'} setIsOpen={setEditModalOpen}>
          {}
        </Modal>
      )}
      {deleteModalOpen && (
        <DeleteModal
          id={id}
          setDeleteModalOpen={setDeleteModalOpen}
          title={'템플릿 삭제'}
          text={'템플릿을 삭제하시겠습니까?'}
        />
      )}
    </>
  );
}

const EditItemArea = styled.div`
  width: 5rem;
  height: 6rem;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  box-shadow: 0px 1px 4px -2px rgba(0, 0, 0, 0.75);

  position: absolute;
`;

const EditItem = styled.div`
  width: 100%;
  height: 3rem;
  text-align: center;
  font-weight: 600;
  line-height: 3rem;
  &:first-of-type {
    border-bottom: 1px solid #e7e7e7;
  }

  &:hover {
    background-color: rgba(235, 241, 255, 0.8);
  }
`;

const EditContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ImgContainer = styled.img`
  width: 1rem;
  height: 1rem;
`;
