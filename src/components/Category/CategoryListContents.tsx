import styled from '@emotion/styled';
import { useCallback, useContext, useRef, useState } from 'react';

import { MainContext } from '@/store';
import useCategory from '@/utils/categoryData';

import DeleteModalContainer from '../Common/DeleteModal';

export type categoryListType = {
  id: number;
  title: string;
};

type CategoryListContentsProps = {
  addedCategory?: categoryListType[];
  isDeleteMode: boolean;
  setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateCategory: (categoryId: number, updateText: string) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newCategoryInputRef: React.RefObject<HTMLInputElement>;
};

export default function CategoryListContents({
  isDeleteMode,
  setIsDeleteMode,
  handleUpdateCategory,
  addedCategory,
  handleCheckboxChange,
  newCategoryInputRef,
}: CategoryListContentsProps) {
  const { categoryListData, isLoading, error } = useCategory();
  const { selectedIds, setSelectedIds } = useContext(MainContext);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [duplicateCategoryId, setDuplicateCategoryId] = useState<number | null>(
    null
  );

  const handleCategoryClick = useCallback(
    (categoryId: number) => {
      setSelectedIds(prevSelectedIds => {
        if (prevSelectedIds.includes(categoryId)) {
          return prevSelectedIds.filter(id => id !== categoryId);
        } else {
          return [...prevSelectedIds, categoryId];
        }
      });
    },
    [setSelectedIds]
  );

  const handleUpdateBlur = useCallback(
    (categoryId: number, updateText: string) => {
      const duplicateTitle = categoryListData?.categories.find(
        category => category.id !== categoryId && category.title === updateText
      );

      setDuplicateCategoryId(duplicateTitle ? categoryId : null);
    },
    [categoryListData?.categories]
  );

  const handleDeleteCategory = useCallback(
    (categoryId: number) => {
      handleUpdateCategory(categoryId, '');
      setDuplicateCategoryId(null);
    },
    [handleUpdateCategory]
  );

  const handlercancelButton = useCallback(() => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedIds([]);
  }, [isDeleteMode, setIsDeleteMode, setSelectedIds]);

  if (isLoading || error || !categoryListData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CategoryListContentsContainer>
        {isDeleteMode
          ? categoryListData.categories.map((item, index) => {
              return (
                <CategoryListContent
                  key={`${item.id}-${index}`}
                  isChecked={selectedIds.includes(item.id)}
                  onClick={() => handleCategoryClick(item.id)}
                >
                  <input
                    type="checkbox"
                    id={String(item.id)}
                    checked={selectedIds.includes(item.id)}
                    onChange={handleCheckboxChange}
                    ref={el => (checkboxRefs.current[item.id - 1] = el)}
                  />
                  <label htmlFor={String(item.id)}>{item.title}</label>
                </CategoryListContent>
              );
            })
          : categoryListData.categories.map((item, index) => (
              <CategoryListInputWrapper key={`${item.id}-${index}`}>
                <CategoryListInput
                  value={item.title}
                  onChange={e => handleUpdateCategory(item.id, e.target.value)}
                  onBlur={e => handleUpdateBlur(item.id, e.target.value)}
                  maxLength={15}
                  ref={
                    addedCategory &&
                    item.id === addedCategory[addedCategory.length - 1].id
                      ? newCategoryInputRef
                      : null
                  }
                  placeholder="카테고리명을 입력하세요"
                />
                {duplicateCategoryId === item.id && (
                  <DuplicateText onClick={() => handleDeleteCategory(item.id)}>
                    카테고리명이 중복됩니다
                  </DuplicateText>
                )}
              </CategoryListInputWrapper>
            ))}
      </CategoryListContentsContainer>
      {isDeleteMode && (
        <CategoryButton>
          <CategoryListCancelButton onClick={handlercancelButton}>
            취소
          </CategoryListCancelButton>
          <CategoryListDeleteButton
            onClick={() => setDeleteModalOpen(!deleteModalOpen)}
            checkedInput={selectedIds.length === 0 ? false : true}
          >
            삭제하기
          </CategoryListDeleteButton>
        </CategoryButton>
      )}
      {deleteModalOpen && (
        <DeleteModalContainer
          title={'삭제 확인'}
          text={
            '선택하신 카테고리를 삭제하시겠습니까? \n (주의) 링크가 있는 경우, 함께 삭제 됩니다.'
          }
          id={selectedIds}
          setDeleteModalOpen={setDeleteModalOpen}
          setIsDeleteMode={setIsDeleteMode}
        />
      )}
    </>
  );
}
const CategoryListInputWrapper = styled('div')`
  position: relative;
`;

const DuplicateText = styled.p`
  color: red;
  font-size: 14px;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
`;

const CategoryListContentsContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  width: 1360px;
  justify-content: center;
`;

const CategoryListContent = styled('div')<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  width: 680px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid ${props => (props.isChecked ? '#6691FF' : '#e7e7e7')};
  margin: 10px;
  padding-left: 15px;
  font-weight: bold;
  background-color: ${props => (props.isChecked ? '#ebf1ff' : 'transparent')};
  color: ${props => (props.isChecked ? '#6691FF' : '#1D1D1D')};
  cursor: pointer;

  & label {
    cursor: pointer;
    padding-left: 1rem;
    pointer-events: none;
  }
`;

const CategoryButton = styled('div')`
  display: flex;
  width: 1400px;
  margin: 50px auto;
  justify-content: center;
`;

const CategoryListCancelButton = styled('div')`
  height: 40px;
  width: 700px;
  border-radius: 10px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  color: #aeaeae;
  cursor: pointer;
  border: 1px solid #e7e7e7;
  margin: 0 10px;
  &:hover {
    background-color: #2d62ea;
    color: #fff;
  }
`;

const CategoryListDeleteButton = styled('div')<{ checkedInput: boolean }>`
  height: 40px;
  width: 700px;
  border-radius: 10px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  margin: 0 10px;
  background-color: ${props => (props.checkedInput ? '#2d62ea' : '#f4f4f4')};
  color: ${props => (props.checkedInput ? '#fff' : '#aeaeae')};
  cursor: ${props => (props.checkedInput ? 'pointer' : 'none')};
  pointer-events: ${props => (props.checkedInput ? 'auto' : 'none')};
  &:first-of-type:hover {
    color: white;
    background-color: #2d62ea;
  }
`;

const CategoryListInput = styled('input')`
  width: 43rem;
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
