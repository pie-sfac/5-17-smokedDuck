import styled from '@emotion/styled';

import Media from '@/components/Media';

export default function MediaManagementPage() {
  return (
    <MediaContainer>
      <Media />
    </MediaContainer>
  );
}

const MediaContainer = styled('div')`
  position: relative;
  margin: 0 auto;
`;
