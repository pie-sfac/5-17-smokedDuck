import styled from '@emotion/styled';

import RecordCard from '@/components/Record/RecordCard';
import useRecord from '@/hooks/useRecord';

type RecordListContainerPropsType = {
  category: string;
};

export default function RecordListContainer({
  category,
}: RecordListContainerPropsType) {
  const { recordListData, isLoading } = useRecord(category);
  if (isLoading || !recordListData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ListBackGround>
        <ListContainer>
          {recordListData.map(item => (
            <RecordCard title={item.title} key={item.id} id={item.id} />
          ))}
        </ListContainer>
      </ListBackGround>
    </>
  );
}

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  overflow: auto;
  height: calc(38rem + 1.5rem + 5px);
  padding: 5px;
  box-sizing: content-box;
  &::-webkit-scrollbar {
    background-color: none;
    width: 0.5rem;
  }
  @media screen and (max-height: 965px) {
    padding: 3px;
    gap: 1rem;
    height: calc(625px - 2rem);
  }
  @media screen and (max-height: 860px) {
    height: 31.5rem;
  }
`;

const ListBackGround = styled.div`
  height: calc(38rem + 1.5rem + 5px + 4rem);
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 10px;
  padding: 2rem 6rem;
  margin-top: 1rem;
  border: 1px solid #e7e7e7;

  @media screen and (max-height: 965px) {
    padding: 1rem 8rem;
    margin-top: 0.5rem;
    height: 625px;
  }
  @media screen and (max-height: 860px) {
    height: 34rem;
  }
`;
