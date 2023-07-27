import styled from '@emotion/styled';
import { useState } from 'react';

import { categoryList } from '@/utils/constants/categoryList';

type CheckedItems = {
  [key: string]: boolean;
};

type CategoryListItemProps = {
  isChecked: boolean;
};

type CategoryItem = {
  id: number;
  title: string;
};

type CategoryDeleteProp = {
  onDeleteCategory: (updatedCategoryList: CategoryItem[]) => void;
};

export default function CategoryDelete({
  onDeleteCategory,
}: CategoryDeleteProp) {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [filteredCategoryList, setFilteredCategoryList] =
    useState<CategoryItem[]>(categoryList);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  const handleDeleteButtonClick = () => {
    const selectedIds = Object.keys(checkedItems).filter(
      key => checkedItems[key]
    );
    const updatedCategoryList = categoryList.filter(
      item => !selectedIds.includes(item.id.toString())
    );
    setFilteredCategoryList(updatedCategoryList); // 삭제된 항목이 보이지 않도록 새로운 리스트로 업데이트
    onDeleteCategory(updatedCategoryList);
  };

  return (
    <>
      <CategoryListContainer>
        {filteredCategoryList.map(item => (
          <CategoryListItem key={item.id} isChecked={checkedItems[item.id]}>
            <input
              type="checkbox"
              id={`item_${item.id}`}
              value={item.id}
              checked={checkedItems[item.id] || false}
              onChange={handleCheckboxChange}
            />
            <label style={{ paddingLeft: '10px' }} htmlFor={`item_${item.id}`}>
              {item.title}
            </label>
          </CategoryListItem>
        ))}
      </CategoryListContainer>
      <CategoryDeleteButton onClick={handleDeleteButtonClick}>
        삭제하기
      </CategoryDeleteButton>
    </>
  );
}

const CategoryListContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  width: 1400px;
`;

const CategoryListItem = styled('div')<CategoryListItemProps>`
  width: 680px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid ${props => (props.isChecked ? '#6691FF' : '#e7e7e7')};
  padding: 25px 20px;
  margin: 10px;
  font-weight: bold;
  background-color: ${props => (props.isChecked ? '#ebf1ff' : 'transparent')};
  color: ${props => (props.isChecked ? '#6691FF' : '#1D1D1D')};
`;

const CategoryDeleteButton = styled('div')`
  width: 1384px;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  background-color: #f4f4f4;
  color: #aeaeae;
  margin-top: 50px;
  cursor: pointer;
`;
