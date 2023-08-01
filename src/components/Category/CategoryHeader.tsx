import styled from '@emotion/styled';

type CategoryHeaderProps = {
  isDeleteMode: boolean;
  setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddCategory: () => void;
  handleNavigate: () => void;
  selectedIds: number[];
};

export default function CategoryHeader({
  isDeleteMode,
  setIsDeleteMode,
  handleAddCategory,
  handleNavigate,
}: CategoryHeaderProps) {
  return (
    <>
      {isDeleteMode ? (
        <CategoryDeleteMode>
          <CategoryHeaderTitle>카테고리 삭제</CategoryHeaderTitle>
        </CategoryDeleteMode>
      ) : (
        <CategoryNotDeleteMode>
          <CategoryNotDeletHeader>
            <CategoryHeaderTitle>카테고리 편집</CategoryHeaderTitle>
            <CategoryNotDeleteButtonList>
              <CategoryNotDelteButton onClick={handleAddCategory}>
                +카테고리 추가
              </CategoryNotDelteButton>
              <CategoryNotDelteButton
                onClick={() => setIsDeleteMode(!isDeleteMode)}
              >
                삭제
              </CategoryNotDelteButton>
              <CategoryNotDelteButton onClick={handleNavigate}>
                완료
              </CategoryNotDelteButton>
            </CategoryNotDeleteButtonList>
          </CategoryNotDeletHeader>
          <CategoryConditions>
            카테고리명은 15자까지 가능합니다. <br />
            카테고리는 최대 10까지 추가할 수 있습니다.
          </CategoryConditions>
        </CategoryNotDeleteMode>
      )}
    </>
  );
}

const CategoryHeaderTitle = styled('div')`
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
`;

const CategoryDeleteMode = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 1400px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e7e7e7;
  margin: 4rem auto 1rem auto;
  font-weight: bold;
`;

const CategoryNotDeleteMode = styled('div')`
  justify-content: space-between;
  width: 1400px;
  padding-bottom: 1rem;
  margin: 4rem auto 1rem auto;
`;

const CategoryNotDeletHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
`;

const CategoryNotDeleteButtonList = styled('div')`
  display: flex;
  margin-bottom: 1rem;
`;

const CategoryNotDelteButton = styled('button')`
  width: 4rem;
  height: 2rem;
  text-align: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  margin-left: 1rem;
  cursor: pointer;
  &:first-of-type {
    width: 120px;
    &:active {
      background-color: #2d62ea;
      color: #fff;
    }
  }
`;

const CategoryConditions = styled('div')`
  margin-top: 1rem;
  color: #737373;
`;
