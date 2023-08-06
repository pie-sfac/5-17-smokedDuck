import styled from '@emotion/styled';
import { useState } from 'react';

import Modal from '@/components/Common/Modal';
import LinkView from '@/components/Link/LinkView';
import MediaCard from '@/components/Media/MediaCard';
import useMediaCards from '@/hooks/useMediaCards';
import { getLinkUrlInfo } from '@/utils/validations/linkUtils';

import Loading from '../Common/Loading';

type MediaListContainerPropType = {
  selectedCategory: string;
};

export default function MediaListContainer({
  selectedCategory,
}: MediaListContainerPropType) {
  const { mediaList, isLoading, error } = useMediaCards(selectedCategory);
  const [activeMediaCardInfo, setActiveMediaCardInfo] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || error || !mediaList) {
    return (
      <LoadingBackGround>
        <Loading />
      </LoadingBackGround>
    );
  }

  return (
    <>
      <ListBackGround>
        {mediaList.map((item, index) => {
          return (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              categoryId={item.category.id}
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
            <LinkView linkId={mediaList[activeMediaCardInfo].id} />
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
  margin: 1rem 0;
  width: 1408px;
  height: 624px;
  padding: 16px;
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 16px;
  border: 1px solid #e7e7e7;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LoadingBackGround = styled('div')`
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 16px;
  margin: 1rem 0;
  padding: 16px;
  width: 1408px;
  height: 624px;
  border: 1px solid #e7e7e7;
`;
