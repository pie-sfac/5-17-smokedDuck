import styled from '@emotion/styled';
import { useState } from 'react';

import MoreVert from '../assets/MoreVert.svg';

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

export default function MediaList() {
  const [list, setList] = useState([
    {
      id: 0,
      category: '카테고리1',
      title: '제목입니다 미디어 관리를 기록하겠습니다',
      description:
        '내용입니다. 오늘의 날씨는 맑음, 오늘도 모두 좋은하루 보내세용',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 1,
      category: '카테고리2',
      title: '타이틀입니다.',
      description: '내용을 추가할게요',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 2,
      category: '카테고리3',
      title: '야호야호',
      description: 'map으로 돌려볼게요 ',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 3,
      category: '카테고리1',
      title: '제목입니다',
      description: '내용입니다.',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 4,
      category: '카테고리2',
      title: '타이틀입니다.',
      description: '내용을 추가할게요',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 5,
      category: '카테고리3',
      title: '야호야호',
      description: 'map으로 돌려볼게요 ',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 6,
      category: '카테고리1',
      title: '제목입니다',
      description: '내용입니다.',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 7,
      category: '카테고리2',
      title: '타이틀입니다.',
      description: '내용을 추가할게요',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
    {
      id: 8,
      category: '카테고리3',
      title: '야호야호',
      description: 'map으로 돌려볼게요 ',
      createdAt: '2023-07-22T17:00:19.634Z',
      updatedAt: '2023-07-22T17:00:19.634Z',
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const DeleteListHandler = (id: number) => {
    const updatedList = list.filter(l => l.id !== id);
    setList(updatedList);
  };

  return (
    <>
      {list.map(item => (
        <MediaContainer key={item.id}>
          {isOpen && (
            <MediaDropdown>
              <p>편집</p>
              <p onClick={() => DeleteListHandler(item.id)}>삭제</p>
            </MediaDropdown>
          )}
          <MediaContent>
            <MoreIcon src={MoreVert} onClick={() => setIsOpen(!isOpen)} />
            <MediaImg src="" alt="" />
            <MediaDiv>
              <MediaTitle>{item.title}</MediaTitle>
              <Mediadescription>{item.description}</Mediadescription>
            </MediaDiv>
          </MediaContent>
        </MediaContainer>
      ))}
    </>
  );
}
