import styled from '@emotion/styled';

import MoreVert from '@/assets/MoreVert.svg';

type MediaContentProps = {
  title: string;
  description: string;
  onMoreClick: () => void;
};

export default function MediaContent({
  title,
  description,
  onMoreClick,
}: MediaContentProps) {
  return (
    <MediaContentContainer>
      <MoreIcon src={MoreVert} onClick={onMoreClick} />
      <MediaImg src="https://placehold.co/24x24" alt="linkImage" />
      <MediaDiv>
        <MediaTitle>{title}</MediaTitle>
        <Mediadescription>{description}</Mediadescription>
      </MediaDiv>
    </MediaContentContainer>
  );
}

const MoreIcon = styled('img')`
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MediaImg = styled('img')`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  text-align: center;
`;

const MediaContentContainer = styled('div')`
  display: flex;
`;

const MediaDiv = styled('div')`
  margin: 8px 0;
  padding-left: 16px;
`;

const MediaTitle = styled('p')`
  width: 240px;
  margin-bottom: 16px;
`;

const Mediadescription = styled('p')`
  width: 240px;
  font-size: 14px;
`;
