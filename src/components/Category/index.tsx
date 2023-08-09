import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createCategory, updateCategory } from '@/apis/Category';
import { MainContext } from '@/store';
import { CategoryRequestDTO } from '@/types/category.interface';
import useCategory from '@/utils/categoryData';

import CategoryHeader from './CategoryHeader';
import CategoryListContents from './CategoryListContents';

export default function Category() {
  const { storedCategoryList, setSelectedIds } = useContext(MainContext);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const newCategoryInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
      await createCategory(newCategoryList);
      mutate();
    } catch (error) {
      console.error('카테고리 추가 중 오류 발생:', error);
    }
  }, [categoryListData, mutate]);

  const handleUpdateCategory = useCallback(
    (categoryId: number, updateText: string) => {
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

      updateCategory(categoryId, updatedCategoryData).catch(error => {
        console.error('카테고리 업데이트 문제 발생', error);
      });
    },
    [mutate]
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
        handleUpdateCategory={handleUpdateCategory}
        newCategoryInputRef={newCategoryInputRef}
      />
    </>
  );
}
