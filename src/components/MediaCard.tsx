import styled from '@emotion/styled';
import { useState } from 'react';

import MoreVert from '@/assets/MoreVert.svg';

export default function MediaCard(props: {
  key: number;
  title: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MediaContainer>
      <MediaContent>
        <MoreIcon src={MoreVert} onClick={() => setIsOpen(!isOpen)} />
        <MediaImg src="" alt="" />
        <MediaDiv>
          <MediaTitle>{props.title}</MediaTitle>
          <Mediadescription>{props.description}</Mediadescription>
        </MediaDiv>
      </MediaContent>
    </MediaContainer>
  );
}

const MediaContainer = styled('div')`
  position: relative;
  width: 440px;
  height: 176px;
  border-radius: 16px;
  border: 1px solid #cfcfcf;
  background-color: #fff;
  padding: 24px;
  margin: 8px;
`;

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

const MediaContent = styled('div')`
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
