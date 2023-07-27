import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import Modal from '@/components/Common/Modal';
import LinkView from '@/components/Link/LinkView';
import MediaCard from '@/components/Media/MediaCard';
import { MainContext } from '@/store';

export default function MediaListContainer() {
  const { mediaList } = useContext(MainContext);
  const [activeMediaCardInfo, setActiveMediaCardInfo] = useState<{
    index: number;
    thumbnailUrl: string;
  }>({
    index: -1,
    thumbnailUrl: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMediaCardClick = (index: number, thumbnailUrl: string) => {
    setActiveMediaCardInfo({
      index,
      thumbnailUrl,
    });
    setIsModalOpen(true);
  };
  return (
    <>
      <ListBackGround>
        {mediaList.map(item => {
          return (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              linkUrl={item.linkUrl || ''}
              onClick={handleMediaCardClick}
            />
          );
        })}
      </ListBackGround>
      {isModalOpen && (
        <Modal
          setIsOpen={setIsModalOpen}
          width={940}
          height={640}
          title={'센터 링크'}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <LinkView
              category={mediaList[activeMediaCardInfo.index].category}
              linkUrl={mediaList[activeMediaCardInfo.index].linkUrl || ''}
              title={mediaList[activeMediaCardInfo.index].title}
              description={mediaList[activeMediaCardInfo.index].description}
              linkTitle={mediaList[activeMediaCardInfo.index].title}
              thumbnailUrl={activeMediaCardInfo.thumbnailUrl}
            />
          </div>
        </Modal>
      )}
    </>
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
