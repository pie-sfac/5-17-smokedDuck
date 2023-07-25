import { Button, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Modal from '@/components/common/Modal';
import MediaCard from '@/components/MediaCard';
import { categoryList } from '@/utils/constants/categoryList';
import { mediaList } from '@/utils/constants/mediaList';

export default function MediaManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.id);
  const [list, setList] = useState(mediaList);

  const handleDeleteList = (id: number) => {
    const updatedList = list.filter(item => item.id !== id);
    setList(updatedList);
  };

  return (
    <MediaListContainer>
      <CategoryTitle>
        {categoryList.map(item => (
          <ul key={item.id}>
            <li
              onClick={() => setSelectedCategory(item.id)}
              style={{
                color: selectedCategory === item.id ? '#6691FF' : 'inherit',
                borderBottom:
                  selectedCategory === item.id
                    ? '1px solid #6691FF'
                    : 'inherit',
              }}
            >
              {item.title}
            </li>
          </ul>
        ))}
        <EditButton>
          <button>편집</button>
        </EditButton>
      </CategoryTitle>
      <ListBackGround>
        {list.map(item => (
          <MediaCard
            id={item.id}
            title={item.title}
            description={item.description}
            onDelete={() => handleDeleteList(item.id)}
          />
        ))}
      </ListBackGround>
      <BlueButton onClick={() => setIsOpen(true)}>+ 링크 추가</BlueButton>
      {isOpen && (
        <Modal
          width={700}
          height={400}
          title={'템플릿 생성'}
          setIsOpen={setIsOpen}
        >
          {}
        </Modal>
      )}
    </MediaListContainer>
  );
}

const MediaListContainer = styled('div')`
  position: relative;
  margin: 6rem auto 0 auto;
`;

const ListBackGround = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 202px);
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: auto;
  margin: 1rem;
  width: 1408px;
  height: 624px;
  padding: 16px;
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
    position: 'absolute',
    // bottom: '-3.5rem',
    right: '1rem',
  },
});

const CategoryTitle = styled('div')`
  display: flex;
  position: relative;
  margin-top: 2rem;
  & > ul {
    list-style: none;
    cursor: pointer;
    padding: 0 1rem;
  }
`;

const EditButton = styled('div')`
  position: absolute;
  right: 1rem;
  width: 64px;
  height: 32px;
  text-align: center;
  padding-top: 4px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
`;
