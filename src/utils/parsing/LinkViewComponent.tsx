import { Box, Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

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
  margin-right: 40px;
`;

const Divider = styled.div`
  width: 1px;
  height: 536px;
  background-color: #e7e7e7;
  margin: 20px 0;
`;

const MemoBox = styled.div`
  width: 400px;
  margin-left: 40px;
`;

const CharacterCount = styled.p`
  position: fixed;
  bottom: 130px;
  right: 110px;
  font-size: 12px;
  color: #777;
`;

const Title = styled.div`
  font-size: 14px;
  float: left;
  margin-top: 18px;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
`;

interface LinkViewProps {
  category: string;
  linkUrl: string;
  linkTitle: string;
  description: string;
  thumbnailUrl: string;
  title: string;
}

function LinkViewComponent({
  category,
  linkUrl,
  linkTitle,
  description,
  thumbnailUrl,
  title,
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
        <Text marginBottom="10px">{linkUrl}</Text>
        <Box borderRadius="lg" bg="white" borderWidth="1px" height="56px">
          <Image
            src={thumbnailUrl}
            alt={title}
            width="40px"
            height="40px"
            float="left"
            marginTop="7px"
            marginLeft="10px"
            marginRight="8px"
            borderRadius="lg"
          />
          <Title>{title}</Title>
        </Box>
        <Heading as="h5" size="md" marginBottom="10px" marginTop="70px">
          링크 제목
        </Heading>
        <Text
          marginBottom="30px"
          width="300px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {linkTitle}
        </Text>
      </LinkInfo>
      <Divider />
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
