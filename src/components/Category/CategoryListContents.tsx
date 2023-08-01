import styled from '@emotion/styled';
import { useCallback, useRef } from 'react';

import { categoryListType } from '@/utils/constants/categoryList';

type CategoryListContentsProps = {
  addedCategory: categoryListType[];
  isDeleteMode: boolean;
  handleModifyCategory: (categoryId: number, updateText: string) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  newCategoryInputRef: React.RefObject<HTMLInputElement>;
  handleDeleteButtonClick: () => void;
};

export default function CategoryListContents({
  isDeleteMode,
  handleModifyCategory,
  addedCategory,
  handleCheckboxChange,
  selectedIds,
  setSelectedIds,
  newCategoryInputRef,
  handleDeleteButtonClick,
}: CategoryListContentsProps) {
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <>
      <CategoryListContentsContainer>
        {isDeleteMode
          ? addedCategory.map(item => (
              <CategoryListContent
                key={item.id}
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
            ))
          : addedCategory.map(item => (
              <CategoryListInput
                key={item.id}
                value={item.title}
                onChange={e => handleModifyCategory(item.id, e.target.value)}
                maxLength={15}
                ref={
                  item.id === addedCategory[addedCategory.length - 1].id
                    ? newCategoryInputRef
                    : null
                }
                placeholder="카테고리명을 입력하세요"
              />
            ))}
      </CategoryListContentsContainer>
      {isDeleteMode && (
        <CategoryListDeleteButton
          onClick={handleDeleteButtonClick}
          checkedInput={selectedIds.length > 0}
        >
          삭제하기
        </CategoryListDeleteButton>
      )}
    </>
  );
}

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

const CategoryListDeleteButton = styled('div')<{ checkedInput: boolean }>`
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  background-color: ${props => (props.checkedInput ? '#2d62ea' : '#f4f4f4')};
  color: ${props => (props.checkedInput ? '#fff' : '#aeaeae')};
  margin: 50px 10px 0 10px;
  cursor: pointer;
  border: none;
  outline: none;
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
