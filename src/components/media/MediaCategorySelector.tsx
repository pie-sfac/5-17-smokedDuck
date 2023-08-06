import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import useCategory from '@/hooks/useCategory';
import useMediaCards from '@/hooks/useMediaCards';

type MediaCategorySelectorPropsType = {
  selectedCategory: string;
  categoryChange: (title: string) => void;
};

export default function MediaCategorySelector({
  selectedCategory,
  categoryChange,
}: MediaCategorySelectorPropsType) {
  const { categoryListData, isLoading, error } = useCategory();
  const { totalLinksCount } = useMediaCards();
  const navigate = useNavigate();

  const categoryMap: { [key: string]: number } = {};

  if (isLoading || error || !categoryListData) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  categoryListData.categories.forEach(category => {
    const title = category.title;
    categoryMap[title] = (categoryMap[title] || 0) + category.totalCount;
  });

  return (
    <MediaCategorySelectorContainer>
      <CategoryTitle>
        <CategoryItem
          onClick={() => categoryChange('전체')}
          className={selectedCategory === '전체' ? 'active' : ''}
        >
          {`전체(${totalLinksCount})`}
        </CategoryItem>
        {categoryListData.categories.map((item, index) => {
          return (
            <CategoryItem
              onClick={() => categoryChange(item.title)}
              className={selectedCategory === item.title ? 'active' : ''}
              key={`${item.id}-${index}`}
            >
              {item.title}({categoryMap[item.title] || 0})
            </CategoryItem>
          );
        })}
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

const LoadingContainer = styled('div')`
  margin-top: 3rem;
  padding: 0 1rem;
  height: 2rem;
  font-size: 18px;
`;
