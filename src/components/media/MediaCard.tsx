import styled from '@emotion/styled';
import { useState } from 'react';

import MediaContent from '@/components/media/MediaContent';

type MediaCardProp = {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
};

export default function MediaCard({
  id,
  title,
  description,
  onDelete,
}: MediaCardProp) {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = () => {
    setIsEdit(false);
    onDelete(id);
  };

  return (
    <MediaContainer>
      {isEdit && (
        <EditItemArea>
          <EditItem>편집</EditItem>
          <EditItem onClick={handleDelete}>삭제</EditItem>
        </EditItemArea>
      )}
      <MediaContent
        title={title}
        description={description}
        onMoreClick={() => setIsEdit(!isEdit)}
      />
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
`;

const EditItemArea = styled('div')`
  position: absolute;
  right: 40px;
  width: 80px;
  height: 96px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 2px rgba(231, 231, 231, 0.8);
  overflow: hidden;
  cursor: pointer;
`;

const EditItem = styled('div')`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  &:first-of-type {
    border-bottom: 1px solid #e7e7e7;
  }
  &:hover {
    color: #fff;
    background-color: #6691ff;
  }
`;
