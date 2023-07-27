import styled from '@emotion/styled';
import { useCallback, useContext, useState } from 'react';

import { MainContext } from '@/store';

export default function CategoryDelete() {
  const { storedCategoryList, setStoredCategoryList } = useContext(MainContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedIds(prevSelectedIds => {
      if (checked) {
        return [...prevSelectedIds, parseInt(value)];
      } else {
        return prevSelectedIds.filter(id => id !== parseInt(value));
      }
    });
  };

  const handleDeleteButtonClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const updatedCategoryList = storedCategoryList.filter(
      item => !selectedIds.includes(item.id)
    );
    setStoredCategoryList(updatedCategoryList);
  }, [storedCategoryList, setStoredCategoryList, selectedIds]);

  return (
    <>
      <CategoryListContainer>
        {storedCategoryList.map(item => (
          <CategoryListItem
            key={item.id}
            isChecked={selectedIds.includes(item.id)}
          >
            <input
              type="checkbox"
              id={`item_${item.id}`}
              value={item.id}
              checked={selectedIds.includes(item.id)}
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

const CategoryListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  width: 1400px;
`;

const CategoryListItem = styled.div<{ isChecked: boolean }>`
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

const CategoryDeleteButton = styled.button`
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
  border: none;
  outline: none;

  &:hover {
    color: white;
    background-color: #2d62ea;
  }
`;
