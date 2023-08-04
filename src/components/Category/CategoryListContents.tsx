import styled from '@emotion/styled';
import { useCallback, useContext, useRef, useState } from 'react';

import useCategory from '@/hooks/useCategory';
import { MainContext } from '@/store';
import { categoryListType } from '@/utils/constants/categoryList';

import DeleteModalContainer from '../Common/DeleteModal';

type CategoryListContentsProps = {
  addedCategory: categoryListType[];
  isDeleteMode: boolean;
  setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleModifyCategory: (categoryId: number, updateText: string) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newCategoryInputRef: React.RefObject<HTMLInputElement>;
};

export default function CategoryListContents({
  isDeleteMode,
  setIsDeleteMode,
  handleModifyCategory,
  addedCategory,
  handleCheckboxChange,
  newCategoryInputRef,
}: CategoryListContentsProps) {
  const { categoryListData, isLoading, error } = useCategory();
  const { selectedIds, setSelectedIds } = useContext(MainContext);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
              <CategoryListInput
                key={`${item.id}-${index}`}
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
          text={'해당 링크를 삭제하시겠습니까?'}
          id={selectedIds}
          setDeleteModalOpen={setDeleteModalOpen}
        />
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
