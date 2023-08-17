import styled from '@emotion/styled';
import { useState } from 'react';

import EditBox from '@/components/Common/EditBox';
import Modal from '@/components/Common/Modal';
import LinkComponent from '@/components/Link/index';
import MediaContent from '@/components/Media/MediaContent';

import DeleteModal from '../Common/DeleteModal';

type MediaCardProps = {
  id: number;
  title: string;
  description: string;
  linkUrl: string;
  thumbnailUrl: string;
  categoryId: number;
  onClick: () => void;
};

export default function MediaCard({
  id,
  title,
  description,
  thumbnailUrl,
  onClick,
  categoryId,
}: MediaCardProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <MediaContainer>
      <MediaContent
        onClick={onClick}
        title={title}
        description={description}
        thumbnailUrl={thumbnailUrl}
      />
      <EditBox
        top={0}
        right={13}
        id={id}
        onEditClick={() => {
          setEditModalOpen(true);
        }}
        onDeleteClick={() => {
          setDeleteModalOpen(true);
        }}
      />
      {editModalOpen && (
        <Modal
          title={'센터 링크 수정'}
          setIsOpen={setEditModalOpen}
          width={940}
          height={640}
          showConfirmationAlert={false}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <LinkComponent mode="UPDATE" linkId={id} />
          </div>
        </Modal>
      )}
      {deleteModalOpen && (
        <DeleteModal
          title={'삭제 확인'}
          text={'해당 링크를 삭제하시겠습니까?'}
          id={id}
          categoryId={categoryId}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
    </MediaContainer>
  );
}

const MediaContainer = styled('div')`
  position: relative;
  width: 440px;
  height: 176px;
  border-radius: 16px;
  border: 1px solid #cfcfcf;
  background-color: #fff;
  padding: 24px;
  margin: 8px;
  box-shadow: 0px 1px 3px -2px rgba(0, 0, 0, 0.75);
  cursor: pointer;
`;
