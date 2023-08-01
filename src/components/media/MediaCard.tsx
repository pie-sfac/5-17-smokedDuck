import styled from '@emotion/styled';
import { useState } from 'react';

import EditBox from '@/components/Common/EditBox';
import MediaContent from '@/components/Media/MediaContent';

type MediaCardProps = {
  id: number;
  title: string;
  description: string;
  linkUrl: string;
  thumbnailUrl: string;
  onClick: () => void;
};

export default function MediaCard({
  id,
  title,
  description,
  thumbnailUrl,
  onClick,
}: MediaCardProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <MediaContainer>
      <MediaContent
        onClick={onClick}
        title={title}
        description={description}
        thumbnailUrl={thumbnailUrl}
      />
      <EditBox top={0} right={13} id={id} onClick={() => setIsEdit(!isEdit)} />
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
