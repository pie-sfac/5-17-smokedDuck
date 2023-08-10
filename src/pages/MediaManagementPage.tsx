import styled from '@emotion/styled';
import { useContext } from 'react';

import Footer from '@/components/Common/Footer';
import Media from '@/components/Media';
import { MediaContext } from '@/store/MediaProvider';
import { QuestionProvider } from '@/store/QuestionProvider';

export default function MediaManagementPage() {
  const { setMediaModalState } = useContext(MediaContext);
  return (
    <QuestionProvider>
      <MediaContainer>
        <Media />
      </MediaContainer>
      <Footer
        onClick={() => setMediaModalState(true)}
        buttonContent={' + 링크 추가'}
      />
    </QuestionProvider>
  );
}

const MediaContainer = styled('div')`
  position: relative;
  margin: 0 auto;
`;
