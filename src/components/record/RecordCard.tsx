import { SkeletonText } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useContext } from 'react';

import { MainContext } from '@/store';

import EditBox from '../Common/EditBox';

type RecordCardPropsType = {
  title: string;
  id: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RecordCard({
  title,
  id,
  setIsOpen,
}: RecordCardPropsType) {
  const { setSelectedTemplateTitle, setSelectedRecordCard } =
    useContext(MainContext);

  const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    setIsOpen(true);
    setSelectedTemplateTitle(title);
    setSelectedRecordCard(title);
  };

  return (
    <CardContainer onClick={cardClickHandler}>
      <CardTitle>{title}</CardTitle>
      <LineArea>
        <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight={2} />
      </LineArea>
      <EditBox top={0} right={13} id={id} />
    </CardContainer>
  );
}

const LineArea = styled.div`
  width: 7rem;
  height: 7rem;
`;

const CardContainer = styled.div`
  padding: 0.8rem;
  box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
  height: 19rem;
  position: relative;

  @media screen and (max-height: 965px) {
    height: 18rem;
    padding: 0.4rem;
    box-shadow: 0px 1px 3px -2px rgba(0, 0, 0, 0.75);
  }

  @media screen and (max-height: 860px) {
    height: 15rem;
  }
`;

const CardTitle = styled.h4`
  font-weight: 700;
  height: 74px;
  width: 10rem;
`;
