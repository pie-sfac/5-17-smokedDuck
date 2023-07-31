import styled from '@emotion/styled';

import CategoryDelete from './CategoryDelete';

type CategoryListContainerProps = {
  isDeleteMode: boolean;
  storedCategoryList: { id: number; title: string }[];
  handleUpdateCategory: (categoryId: number, updateText: string) => void;
  newCategoryInputRef: React.RefObject<HTMLInputElement>;
};

export default function CategoryListContainer({
  isDeleteMode,
  storedCategoryList,
  handleUpdateCategory,
  newCategoryInputRef,
}: CategoryListContainerProps) {
  return (
    <CategoryList>
      {isDeleteMode ? (
        storedCategoryList.map(item => (
          <CategoryListItem
            key={item.id}
            value={item.title}
            onChange={e => handleUpdateCategory(item.id, e.target.value)}
            maxLength={15}
            ref={
              item.id === storedCategoryList[storedCategoryList.length - 1].id
                ? newCategoryInputRef
                : null
            }
            placeholder="카테고리명을 입력하세요"
          />
        ))
      ) : (
        <CategoryDelete />
      )}
    </CategoryList>
  );
}

const CategoryList = styled('div')`
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
  ::placeholder {
    color: #999;
    font-weight: normal;
  }
`;
