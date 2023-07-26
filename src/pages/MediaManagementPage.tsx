import { Button, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Modal from '@/components/common/Modal';
import CategorySelector from '@/components/Media/CategorySelector';
import MediaListContainer from '@/components/Media/MediaListContainer';

export default function MediaManagementPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MediaContainer>
      <CategorySelector />
      <MediaListContainer />
      <BlueButton onClick={() => setIsOpen(true)}>+ 링크 추가</BlueButton>
      {isOpen && (
        <Modal
          width={700}
          height={400}
          title={'센터 링크 추가'}
          setIsOpen={setIsOpen}
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

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
    position: 'absolute',
    right: '1rem',
  },
});
