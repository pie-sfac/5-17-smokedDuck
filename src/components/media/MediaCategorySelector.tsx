import styled from '@emotion/styled';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useCategory from '@/hooks/useCategory';
import { MainContext } from '@/store';

export default function MediaCategorySelector() {
  const { categoryListData, isLoading, error } = useCategory();
  const { storedCategoryList } = useContext(MainContext);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryListData?.categories[0].id
  );
  const navigate = useNavigate();

  const categoryMap: { [key: string]: number } = {};

  if (isLoading || error || !categoryListData) {
    return <div>Loading...</div>;
  }

  categoryListData.categories.forEach(category => {
    const title = category.title;
    categoryMap[title] = (categoryMap[title] || 0) + category.totalCount;
  });

  const mergedCategoryList = [
    ...categoryListData.categories,
    ...storedCategoryList,
  ];

  return (
    <MediaCategorySelectorContainer>
      <CategoryTitle>
        {mergedCategoryList.map(item => (
          <CategoryItem
            onClick={() => setSelectedCategory(item.id)}
            className={selectedCategory === item.id ? 'active' : ''}
            key={item.id}
          >
            {item.title}({categoryMap[item.title] || 0})
          </CategoryItem>
        ))}
      </CategoryTitle>
      <EditButton onClick={() => navigate('/category')}>편집</EditButton>
    </MediaCategorySelectorContainer>
  );
}

const MediaCategorySelectorContainer = styled('div')`
  height: 2rem;
`;

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

const EditButton = styled('button')`
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
