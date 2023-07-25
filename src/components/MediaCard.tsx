import styled from '@emotion/styled';
import { useState } from 'react';

import MoreVert from '@/assets/MoreVert.svg';

export default function MediaCard(props: {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = () => {
    setIsEdit(false);
    props.onDelete(props.id);
  };

  return (
    <MediaContainer>
      {isEdit && (
        <MediaDropdown>
          <p>편집</p>
          <p onClick={handleDelete}>삭제</p>
        </MediaDropdown>
      )}
      <MediaContent>
        <MoreIcon src={MoreVert} onClick={() => setIsEdit(!isEdit)} />
        <MediaImg src="https://placehold.co/24x24" alt="" />
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
  box-shadow: 0px 1px 3px -2px rgba(0, 0, 0, 0.75);
`;

const MediaDropdown = styled('div')`
  position: absolute;
  right: 40px;
  width: 80px;
  height: 96px;
  padding: 16px 24px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 2px rgba(231, 231, 231, 0.8);
  cursor: pointer;
  & p:first-of-type {
    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 8px;
  }
  & p:last-of-type {
    padding-top: 8px;
  }
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
