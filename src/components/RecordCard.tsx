import { SkeletonText } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import HambergerDot from '../assets/hamburgerDots.svg';

export default function RecordCard(props: { title: string; id: number }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <CardContainer>
      <CardTitle>{props.title}</CardTitle>
      <LineArea>
        <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight={2} />
      </LineArea>
      <EditContainer onClick={() => setEditOpen(!editOpen)}>
        <ImgContainer src={HambergerDot} alt="편집/삭제버튼" />
        {editOpen && (
          <EditBox>
            <EditItem>편집</EditItem>
            <EditItem>삭제</EditItem>
          </EditBox>
        )}
      </EditContainer>
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
`;

const CardTitle = styled.h4`
  font-weight: 700;
  height: 74px;
  width: 10rem;
`;

const EditBox = styled.div`
  width: 5rem;
  height: 6rem;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  box-shadow: 0px 1px 4px -2px rgba(0, 0, 0, 0.75);

  position: absolute;
  top: 0;
  right: 0.8rem;
`;

const EditItem = styled.div`
  width: 100%;
  height: 3rem;
  text-align: center;
  font-weight: 600;
  line-height: 3rem;
  &:first-of-type {
    border-bottom: 1px solid #e7e7e7;
  }

  &:hover {
    background-color: rgba(235, 241, 255, 0.8);
  }
`;

const EditContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ImgContainer = styled.img`
  width: 1rem;
  height: 1rem;
`;
