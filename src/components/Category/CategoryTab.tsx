import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { categoryList } from '@/utils/constants/categoryList';

import CategoryDelete from './CategoryDelete';

type CategoryItem = {
  id: number;
  title: string;
};

export default function CategoryTab() {
  const [isDeleteMode, setIsDeleteMode] = useState(true);
  const [filteredCategoryList, setFilteredCategoryList] =
    useState<CategoryItem[]>(categoryList);

  const navigate = useNavigate();

  return (
    <>
      <CategoryTabContainer>
        {isDeleteMode ? (
          <>
            <div style={{ paddingTop: '1rem' }}>카테고리 편집</div>
            <CategotyEditList>
              <CategoryEdit>+카테고리 추가</CategoryEdit>{' '}
              <CategoryEdit onClick={() => setIsDeleteMode(!isDeleteMode)}>
                삭제
              </CategoryEdit>
              <CategoryEdit onClick={() => navigate('/media')}>
                완료
              </CategoryEdit>
            </CategotyEditList>
          </>
        ) : (
          <>
            <div style={{ paddingTop: '1rem' }}>카테고리 삭제</div>
            <CategotyEditList>
              <CategoryEdit onClick={() => setIsDeleteMode(!isDeleteMode)}>
                취소
              </CategoryEdit>
            </CategotyEditList>
          </>
        )}
      </CategoryTabContainer>
      {isDeleteMode && (
        <CategoryConditions>
          카테고리명은 15자까지 가능합니다. <br />
          카테고리는 최대 10까지 추가할 수 있습니다.
        </CategoryConditions>
      )}
      <CategoryListContainer>
        {isDeleteMode ? (
          filteredCategoryList.map(item => (
            <ul key={item.id} style={{ listStyle: 'none' }}>
              <CategoryListItem>{item.title}</CategoryListItem>
            </ul>
          ))
        ) : (
          <CategoryDelete
            onDeleteCategory={updateCategoryList => {
              setFilteredCategoryList(updateCategoryList);
            }}
          />
        )}
      </CategoryListContainer>
    </>
  );
}

const CategoryTabContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 1400px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e7e7e7;
  margin: 4rem auto 1rem auto;
`;

const CategotyEditList = styled('div')`
  display: flex;
  margin-top: 8px;
  cursor: pointer;
`;

const CategoryEdit = styled('div')`
  width: 64px;
  height: 32px;
  text-align: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding-top: 4px;
  margin-left: 8px;
  &:first-of-type {
    width: 120px;
  }
`;

const CategoryConditions = styled('div')`
  margin-left: 18px;
  color: #737373;
`;

const CategoryListContainer = styled('div')`
  margin: 64px auto 0 auto;
  width: 1400px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const CategoryListItem = styled('li')`
  width: 680px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid #e7e7e7;
  padding: 25px 20px;
  margin: 10px;
  font-weight: bold;
`;
