import styled from '@emotion/styled';

type MediaContentProps = {
  title: string;
  description: string;
  thumbnailUrl?: string;
  onClick(): void;
};

export default function MediaContent({
  title,
  description,
  thumbnailUrl,
  onClick,
}: MediaContentProps) {
  return (
    <MediaContentContainer onClick={onClick}>
      <MediaImg
        src={thumbnailUrl || 'https://placehold.co/24x24'}
        alt="linkImage"
      />
      <MediaDiv>
        <MediaTitle>{title}</MediaTitle>
        <Mediadescription>{description}</Mediadescription>
      </MediaDiv>
    </MediaContentContainer>
  );
}

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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Mediadescription = styled('p')`
  width: 240px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
