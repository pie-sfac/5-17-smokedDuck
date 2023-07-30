import styled from '@emotion/styled';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '@/store';

import CategoryDelete from './CategoryDelete';

export default function CategoryTab() {
  const { storedCategoryList, setStoredCategoryList } = useContext(MainContext);
  const [isDeleteMode, setIsDeleteMode] = useState(true);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const newCategoryInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleAddCategory = useCallback(() => {
    if (storedCategoryList.length >= 10) {
      return;
    }
    const newCategory = {
      id: storedCategoryList.length + 1,
      title: '카테고리명을 입력해주세요',
    };
    setStoredCategoryList(prevCategory => [...prevCategory, newCategory]);
    setIsAddingCategory(true);
  }, [setStoredCategoryList, storedCategoryList.length]);

  const handleUpdateCategory = useCallback(
    (categoryId: number, updateText: string) => {
      setStoredCategoryList(prevCategory => {
        return prevCategory.map(storedCategoryList => {
          if (storedCategoryList.id === categoryId) {
            return { ...storedCategoryList, title: updateText };
          }
          return storedCategoryList;
        });
      });
    },
    [setStoredCategoryList]
  );

  useEffect(() => {
    if (isAddingCategory && newCategoryInputRef.current) {
      setIsAddingCategory(false);
      newCategoryInputRef.current.focus();
    }
  }, [isAddingCategory]);

  return (
    <>
      <CategoryTabContainer>
        {isDeleteMode ? (
          <>
            <div style={{ paddingTop: '1rem' }}>카테고리 편집</div>
            <CategotyEditList>
              <CategoryEdit
                onClick={handleAddCategory}
                disabled={storedCategoryList.length >= 10}
              >
                +카테고리 추가
              </CategoryEdit>
              <CategoryEdit onClick={() => setIsDeleteMode(!isDeleteMode)}>
                삭제
              </CategoryEdit>
              <CategoryEdit
                onClick={() => {
                  setStoredCategoryList(storedCategoryList);
                  navigate('/media');
                }}
              >
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
          storedCategoryList.map(item => (
            <CategoryListItem
              key={item.id}
              value={item.title}
              onChange={e => handleUpdateCategory(item.id, e.target.value)}
              readOnly={item.id === 0}
              maxLength={15}
              ref={
                item.id === storedCategoryList.length
                  ? newCategoryInputRef
                  : null
              }
            />
          ))
        ) : (
          <CategoryDelete />
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

const CategoryEdit = styled('button')`
  width: 64px;
  height: 32px;
  text-align: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding-top: 4px;
  margin-left: 8px;
  &:first-of-type {
    width: 120px;
    &:disabled:hover {
      background-color: #ccc;
      cursor: not-allowed;
      color: #666;
    }
    &:not(:disabled):active {
      background-color: #2d62ea;
      color: #fff;
    }
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

const CategoryListItem = styled('input')`
  width: 680px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid #e7e7e7;
  padding: 25px 20px;
  margin: 10px;
  font-weight: bold;
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #6691ff;
    border-color: #6691ff;
  }
`;
