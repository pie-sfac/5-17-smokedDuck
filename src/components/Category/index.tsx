import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '@/store';
import { categoryListType } from '@/utils/constants/categoryList';

import CategoryHeader from './CategoryHeader';
import CategoryListContents from './CategoryListContents';

export default function Category() {
  const { storedCategoryList, setStoredCategoryList } = useContext(MainContext);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [addedCategory, setAddedCategory] =
    useState<categoryListType[]>(storedCategoryList);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const newCategoryInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleAddCategory = useCallback(() => {
    if (addedCategory.length === 10) {
      alert('카테고리는 10개까지 추가할 수있습니다.');
      return;
    }
    setAddedCategory(prevCategory => [
      ...prevCategory,
      {
        id:
          addedCategory.length === 0
            ? 1
            : addedCategory[addedCategory.length - 1].id + 1,
        title: '',
      },
    ]);

    setIsAddingCategory(true);
  }, [addedCategory]);

  const handleModifyCategory = useCallback(
    (categoryId: number, updateText: string) => {
      setAddedCategory(prevCategory => {
        return prevCategory.map(addedCategory => {
          if (addedCategory.id === categoryId) {
            return { ...addedCategory, title: updateText };
          }
          return addedCategory;
        });
      });
    },
    [setAddedCategory]
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
    []
  );

  const handleDeleteButtonClick = useCallback(() => {
    const updatedCategoryList = addedCategory.filter(
      item => !selectedIds.includes(item.id)
    );
    setAddedCategory(updatedCategoryList);
    setSelectedIds([]);
    setIsDeleteMode(!isDeleteMode);
  }, [addedCategory, isDeleteMode, selectedIds]);

  const handleNavigate = () => {
    setStoredCategoryList(addedCategory);
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
        selectedIds={selectedIds}
      />
      <CategoryListContents
        addedCategory={addedCategory}
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
        handleCheckboxChange={handleCheckboxChange}
        handleModifyCategory={handleModifyCategory}
        setSelectedIds={setSelectedIds}
        selectedIds={selectedIds}
        newCategoryInputRef={newCategoryInputRef}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </>
  );
}
