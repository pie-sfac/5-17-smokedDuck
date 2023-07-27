import styled from '@emotion/styled';
import { useContext } from 'react';

import Category from '@/components/Category';
import Modal from '@/components/Common/Modal';
import MediaListContainer from '@/components/Media/MediaListContainer';
import { MainContext } from '@/store';

export default function MediaManagementPage() {
  const { mediaModalOpen, setMediaModalState } = useContext(MainContext);

  return (
    <MediaContainer>
      <Category />
      <MediaListContainer />
      {mediaModalOpen && (
        <Modal
          width={700}
          height={400}
          title={'센터 링크 생성'}
          setIsOpen={setMediaModalState}
        >
          {}
        </Modal>
      )}
    </MediaContainer>
  );
}

const MediaContainer = styled('div')`
  position: relative;
  margin: 4rem auto 0 auto;
`;
