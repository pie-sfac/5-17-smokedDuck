import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import RecordCard from '@/components/record/RecordCard';
import { MainContext } from '@/store';
import { recordListType } from '@/utils/constants/recordList';

export default function RecordListContainer(props: { templateType: string }) {
  const { recordList } = useContext(MainContext);

  const [list, setList] = useState<recordListType[]>(
    recordList.filter(listitem => listitem.type === props.templateType)
  );

  useEffect(() => {
    setList(
      recordList.filter(listitem => listitem.type === props.templateType)
    );
  }, [props.templateType, recordList]);

  return (
    <ListBackGround>
      <ListContainer>
        {list.map(item => (
          <RecordCard title={item.title} key={item.id} id={item.id} />
        ))}
      </ListContainer>
    </ListBackGround>
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
  @media screen and (max-height: 750px) {
    padding: 3px;
    gap: 1rem;
    height: calc(28rem + 1.5rem + 3px);
  }
`;

const ListBackGround = styled.div`
  height: calc(38rem + 1.5rem + 5px + 4rem);
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 10px;
  padding: 2rem 6rem;
  margin-top: 1rem;
  border: 1px solid #e7e7e7;
  @media screen and (max-height: 750px) {
    padding: 1rem 8rem;
    margin-top: 0.5rem;
    height: calc(28rem + 1.5rem + 3px + 2rem);
  }
`;
