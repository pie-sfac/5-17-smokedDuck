import styled from '@emotion/styled';
import { useContext } from 'react';

import MediaCard from '@/components/Media/MediaCard';
import { MainContext } from '@/store';

export default function MediaListContainer() {
  const { mediaList } = useContext(MainContext);

  return (
    <ListBackGround>
      {mediaList.map(item => (
        <MediaCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
        />
      ))}
    </ListBackGround>
  );
}

const ListBackGround = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 200px);
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: auto;
  margin: 1rem;
  width: 1408px;
  height: 624px;
  padding: 16px;
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
