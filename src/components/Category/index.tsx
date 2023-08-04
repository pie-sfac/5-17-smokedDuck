import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createCategory, updateCategory } from '@/apis/Category';
import useCategory from '@/hooks/useCategory';
import { MainContext } from '@/store';
import {
  CategoryRequestDTO,
  CategoryResponseDTO,
} from '@/types/category.interface';

import CategoryHeader from './CategoryHeader';
import CategoryListContents from './CategoryListContents';

export default function Category() {
  const { storedCategoryList, setSelectedIds } = useContext(MainContext);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const newCategoryInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { loginToken } = useContext(MainContext);
  const { categoryListData, mutate } = useCategory();

  const handleAddCategory = useCallback(async () => {
    if (categoryListData?.categories.length === 10) {
      alert('카테고리는 10개까지 추가할 수있습니다.');
      return;
    }
    try {
      const newCategoryList: CategoryRequestDTO = {
        title: '',
        description: '',
      };

      const newCategory: CategoryResponseDTO | undefined = await createCategory(
        loginToken,
        newCategoryList
      );

      if (newCategory) {
        if (categoryListData) {
          const updatedCategoryListData = {
            ...categoryListData,
            categories: [...categoryListData.categories, newCategory],
          };
          mutate(updatedCategoryListData, true);
        } else {
          const updatedCategoryListData = {
            categories: [newCategory],
            message: '',
          };
          mutate(updatedCategoryListData, true);
        }
      }
    } catch (error) {
      console.error('카테고리 추가 중 오류 발생:', error);
    }
  }, [categoryListData, loginToken, mutate]);

  const handleUpdateyCategory = useCallback(
    async (categoryId: number, updateText: string) => {
      try {
        mutate(data => {
          if (data) {
            return {
              ...data,
              categories: data.categories.map(category =>
                category.id === categoryId
                  ? { ...category, title: updateText }
                  : category
              ),
            };
          }
          return data;
        }, false);
        const updatedCategoryData: CategoryRequestDTO = {
          title: updateText,
          description: '',
        };
        await updateCategory(categoryId, updatedCategoryData, loginToken);
        mutate();
      } catch (error) {
        console.error('카테고리 업데이트 문제 발생', error);
        mutate();
      }
    },
    [loginToken, mutate]
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, id } = event.target;
      setSelectedIds(prevSelectedIds => {
        if (checked) {
          return [...prevSelectedIds, Number(id)];
        } else {
          return prevSelectedIds.filter(prevId => prevId !== Number(id));
        }
      });
    },
    [setSelectedIds]
  );

  const handleNavigate = () => {
    navigate('/media');
  };

  useEffect(() => {
    if (isAddingCategory && newCategoryInputRef.current) {
      setIsAddingCategory(false);
      newCategoryInputRef.current.focus();
    }
  }, [isAddingCategory]);

  return (
    <>
      <CategoryHeader
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
        handleAddCategory={handleAddCategory}
        handleNavigate={handleNavigate}
      />
      <CategoryListContents
        addedCategory={storedCategoryList}
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
        handleCheckboxChange={handleCheckboxChange}
        handleUpdateyCategory={handleUpdateyCategory}
        newCategoryInputRef={newCategoryInputRef}
      />
    </>
  );
}
