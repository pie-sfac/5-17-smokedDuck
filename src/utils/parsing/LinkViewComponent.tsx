import { AbsoluteCenter, Alert, Box, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import Logo from '@/assets/Logo.svg';

const Container = styled.div`
  display: flex;
  width: 992px;
  background-color: #fafbff;
  height: 600px;
  justify-content: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: #e7e7e7;
`;

const StyledImg = styled.img`
  width: 192px;
  height: 64px;
  margin-bottom: 48px;
  margin-top: 40px;
`;

const LinkInfo = styled.div`
  width: 400px;
  height: 376px;
`;

const Divider = styled.div`
  width: 1px;
  height: 536px;
  background-color: #e7e7e7;
  margin: 20px 0;
`;

const MemoBox = styled.div`
  width: 400px;
  margin-left: 70px;
`;

const CharacterCount = styled.p`
  position: fixed;
  bottom: 130px;
  right: 110px;
  font-size: 12px;
  color: #777;
`;

interface LinkViewProps {
  category: string;
  linkUrl: string;
  linkTitle: string;
  description: string;
}

function LinkViewComponent({
  category,
  linkUrl,
  linkTitle,
  description,
}: LinkViewProps) {
  return (
    <Container>
      <LinkInfo>
        <StyledImg src={Logo} alt="logo" />
        <Heading as="h5" size="md" marginBottom="10px">
          카테고리
        </Heading>
        <Text marginBottom="60px">{category}</Text>
        <Heading as="h5" size="md" marginBottom="10px">
          링크
        </Heading>
        <Text marginBottom="10px">linkUrl</Text>
        <Box bg="white" borderWidth="1px" borderRadius="lg" height="56px"></Box>
        <Heading as="h5" size="md" marginBottom="10px" marginTop="70px">
          링크 제목
        </Heading>
        <Text marginBottom="30px">{linkTitle}</Text>
      </LinkInfo>
      <AbsoluteCenter>
        <Divider />
      </AbsoluteCenter>
      <MemoBox>
        <Heading as="h5" size="md" marginBottom="10px" marginTop="50px">
          메모
        </Heading>
        <Box
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          height="440px"
          px={4}
          alignItems="center"
          fontSize="sm"
          display="flex"
          justifyItems="center"
        >
          <Text>{description}</Text>
          <CharacterCount>{description.length} / 500</CharacterCount>
        </Box>
      </MemoBox>
    </Container>
  );
}

export default LinkViewComponent;
