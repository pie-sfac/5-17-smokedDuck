import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { mediaList } from '@/utils/constants/mediaList';

import MediaCard from './MediaCard';

export default function MediaListContainer() {
  const [list, setList] = useState(mediaList);

  const handleDeleteList = useCallback((id: number) => {
    setList(prevList => prevList.filter(item => item.id !== id));
  }, []);

  return (
    <ListBackGround>
      {list.map(item => (
        <MediaCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          onDelete={() => handleDeleteList(item.id)}
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
