import styled from '@emotion/styled';

import MediaCard from '@/components/MediaCard';
import { mediaList } from '@/utils/constants/mediaList';

export default function MediaManagementPage() {
  return (
    <MediaListContainer>
      {mediaList.map(item => (
        <MediaCard
          key={item.id}
          title={item.title}
          description={item.description}
        />
      ))}
    </MediaListContainer>
  );
}

const MediaListContainer = styled('div')`
  display: flex;
  position: fixed;
  top: 24%;
  left: 14%;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1400px;
  height: 624px;
  padding: 16px;
  background-color: rgba(235, 241, 255, 0.26);
  border-radius: 16px;
`;
