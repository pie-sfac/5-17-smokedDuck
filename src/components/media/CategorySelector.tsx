import styled from '@emotion/styled';
import { useState } from 'react';

import { categoryList } from '@/utils/constants/categoryList';

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0].id);

  return (
    <>
      <CategoryTitle>
        {categoryList.map(item => (
          <CategoryItem
            onClick={() => setSelectedCategory(item.id)}
            className={selectedCategory === item.id ? 'active' : ''}
            key={item.id}
          >
            {item.title}
          </CategoryItem>
        ))}
      </CategoryTitle>
      <EditButton>
        <button>편집</button>
      </EditButton>
    </>
  );
}

const CategoryTitle = styled('ul')`
  display: flex;
  margin-top: 3rem;

  list-style: none;
  cursor: pointer;
  padding: 0 1rem;
`;

const CategoryItem = styled('li')`
  padding: 0.5rem;
  font-weight: 600;
  border-bottom: 0.15rem solid #cfcfcf;
  color: #cfcfcf;
  &.active {
    color: #6691ff;
    border-bottom: 0.18rem solid #6691ff;
  }
`;

const EditButton = styled('div')`
  position: absolute;
  right: 0;
  top: 0;
  width: 64px;
  height: 32px;
  text-align: center;
  padding-top: 4px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
`;
