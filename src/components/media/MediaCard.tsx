import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import EditBox from '@/components/Common/EditBox';
import MediaContent from '@/components/Media/MediaContent';
import { useYoutubeVideo } from '@/hooks/UseYoutubeVideo';

type MediaCardProps = {
  id: number;
  title: string;
  description: string;
  linkUrl: string;
  onClick: (id: number, thumbnailUrl: string) => void;
};

export default function MediaCard({
  id,
  title,
  description,
  linkUrl,
  onClick,
}: MediaCardProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const { youtubeVideo, handler } = useYoutubeVideo();

  useEffect(() => {
    handler(linkUrl);
  }, [linkUrl, handler]);

  useEffect(() => {
    if (youtubeVideo) {
      setThumbnailUrl(youtubeVideo.thumbnailUrl);
    }
  }, [youtubeVideo]);

  return (
    <MediaContainer>
      <MediaContent
        onClick={() => onClick(id, thumbnailUrl)}
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
