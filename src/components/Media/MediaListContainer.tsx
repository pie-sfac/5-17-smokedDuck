import styled from '@emotion/styled';
import { useState } from 'react';

import Modal from '@/components/Common/Modal';
import LinkView from '@/components/Link/LinkView';
import MediaCard from '@/components/Media/MediaCard';
import { GetLinkDetailResponse } from '@/types/media.interface';
import useMediaList from '@/utils/mediaListData';
import { getLinkUrlInfo } from '@/utils/validations/linkUtils';

import Loading from '../Common/Loading';

type MediaListContainerProp = {
  selectedCategory: string;
};

export default function MediaListContainer({
  selectedCategory,
}: MediaListContainerProp) {
  const { mediaList } = useMediaList(selectedCategory);
  const [activeMediaCardInfo, setActiveMediaCardInfo] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const compareUpdateDate = (
    prevMedia: GetLinkDetailResponse,
    nextMedia: GetLinkDetailResponse
  ) => {
    const prevUpdatedAt = new Date(prevMedia.updatedAt).getTime();
    const nextUpdatedAt = new Date(nextMedia.updatedAt).getTime();
    return nextUpdatedAt - prevUpdatedAt;
  };

  return (
    <ListBackGround>
      {!mediaList && <Loading />}
      {mediaList && mediaList.length === 0 ? (
        <EmptyListBackground>
          <img src="src/assets/EmptyMedia.svg" />
        </EmptyListBackground>
      ) : (
        <ListContainer>
          {mediaList &&
            mediaList.sort(compareUpdateDate).map((item, index) => {
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
        </ListContainer>
      )}
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
    </ListBackGround>
  );
}

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 200px);
  overflow-y: scroll;
  height: calc(38rem + 1.5rem + 5px);
  box-sizing: content-box;
  place-items: center;
  z-index: -9999;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-height: 965px) {
    height: calc(625px - 2rem);
  }
  @media screen and (max-height: 860px) {
    height: 31.5rem;
  }
`;

const ListBackGround = styled.div`
  height: calc(38rem + 1.5rem + 5px + 4rem);
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 10px;
  padding: 2rem 6rem;
  margin-top: 1rem;
  border: 1px solid #e7e7e7;
  @media screen and (max-height: 965px) {
    margin-top: calc(0.5rem + 10px);
    height: 625px;
  }
  @media screen and (max-height: 860px) {
    height: 34rem;
  }
`;

const EmptyListBackground = styled('div')`
  margin: 1rem 0;
  padding: 16px;
  width: 1408px;
  height: 624px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
