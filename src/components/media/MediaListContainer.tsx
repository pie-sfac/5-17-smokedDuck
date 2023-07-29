import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Modal from '@/components/Common/Modal';
import LinkView from '@/components/Link/LinkView';
import MediaCard from '@/components/Media/MediaCard';
import { useMediaList } from '@/hooks/useMedia';
import { getLinkUrlInfo } from '@/utils/validations/linkUtils';

export default function MediaListContainer() {
  const mediaList = useMediaList();
  const [activeMediaCardInfo, setActiveMediaCardInfo] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <ListBackGround>
        {mediaList?.archiveLinks.map((item, index) => {
          return (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              linkUrl={getLinkUrlInfo(item.url).linkUrl || ''}
              thumbnailUrl={getLinkUrlInfo(item.url).thumbnailUrl || ''}
              onClick={() => {
                setActiveMediaCardInfo(index), setIsModalOpen(true);
              }}
            />
          );
        })}
      </ListBackGround>
      {isModalOpen && mediaList && (
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
            <LinkView linkId={mediaList.archiveLinks[activeMediaCardInfo].id} />
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
