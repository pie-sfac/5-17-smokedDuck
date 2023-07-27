import { Box, Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import Logo from '@/assets/Logo.svg';

interface LinkViewProps {
  category: string;
  linkUrl: string;
  linkTitle: string;
  description: string;
  thumbnailUrl: string;
  title: string;
}

function LinkView({
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
        <Heading as="h6" size="sm" marginBottom="10px">
          카테고리
        </Heading>
        <Text marginBottom="40px">{category}</Text>
        <Heading as="h6" size="sm" marginBottom="10px">
          링크
        </Heading>
        <Text marginBottom="10px">{linkUrl}</Text>
        <Box
          borderRadius="lg"
          bg="white"
          borderWidth="1px"
          height="56px"
          width="378px"
        >
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
        <Heading as="h6" size="sm" marginBottom="10px" marginTop="40px">
          링크 제목
        </Heading>
        <Text
          marginBottom="10px"
          width="350px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {linkTitle}
        </Text>
      </LinkInfo>

      <Divider />

      <MemoBox>
        <Heading as="h6" size="sm" marginBottom="10px" marginTop="40px">
          메모
        </Heading>
        <Box
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          height="400px"
          px={4}
          alignItems="center"
          fontSize="sm"
          display="flex"
          justifyItems="center"
        >
          <Text whiteSpace="pre-wrap">{description}</Text>
          <CharacterCount>{description.length} / 500</CharacterCount>
        </Box>
      </MemoBox>
    </Container>
  );
}

export default LinkView;

const Container = styled.div`
  display: flex;
  width: 900px;
  background-color: #fafbff;
  height: 500px;
  justify-content: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: #e7e7e7;
`;

const StyledImg = styled.img`
  width: 184px;
  height: 56px;
  margin-bottom: 40px;
  margin-top: 40px;
  margin-left: -10px;
`;

const LinkInfo = styled.div`
  height: 376px;
  margin-right: 32px;
  font-size: 14px;
`;

const Divider = styled.div`
  width: 1px;
  height: 464px;
  background-color: #e7e7e7;
  margin: 20px 0;
`;

const MemoBox = styled.div`
  width: 378px;
  height: 320px;
  margin-left: 30px;
`;

const CharacterCount = styled.p`
  position: fixed;
  bottom: 80px;
  right: 80px;
  font-size: 12px;
  color: #777;
`;

const Title = styled.div`
  font-size: 14px;
  float: left;
  margin-top: 15px;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 240px;
`;
