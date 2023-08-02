import { CircularProgress } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function Loading() {
  return (
    <LodingContainer>
      <CircularProgress isIndeterminate color="blue.300" />
    </LodingContainer>
  );
}

const LodingContainer = styled.div`
  marigin: auto;
  width: 50px;
  height: 50px;
`;
