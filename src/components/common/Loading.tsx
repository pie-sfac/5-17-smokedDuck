import { CircularProgress } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function Loading() {
  return (
    <LoadingArea>
      <LodingContainer>
        <CircularProgress isIndeterminate color="blue.300" />
      </LodingContainer>
    </LoadingArea>
  );
}

const LodingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
