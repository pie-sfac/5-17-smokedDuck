import { Box, Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useContext } from 'react';
import useSWR from 'swr';

import { getLinkDetails, LINK_URL } from '@/apis/Media';
import Logo from '@/assets/Logo.svg';
import { MainContext } from '@/store';
import { GetLinkDetailResponse } from '@/types/media.interface';
import { getLinkUrlInfo } from '@/utils/validations/linkUtils';

interface LinkViewProps {
  linkId: number;
}

function LinkView({ linkId }: LinkViewProps) {
  const { loginToken } = useContext(MainContext);

  const { data: media } = useSWR<
    GetLinkDetailResponse,
    never,
    [string, string]
  >([`${LINK_URL}${linkId}`, loginToken || ''], ([_, accessToken]) =>
    getLinkDetails(linkId, accessToken)
  );

  const [mediaUrl] = (media?.url || '').split(';');
  return (
    <Container>
      <LinkInfo>
        <StyledImg src={Logo} alt="logo" />
        <Heading as="h6" size="sm" marginBottom="10px">
          카테고리
        </Heading>
        <Text marginBottom="40px">{media?.category.title}</Text>
        <Heading as="h6" size="sm" marginBottom="10px">
          링크
        </Heading>
        <Text
          marginBottom="10px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {mediaUrl}
        </Text>
        <Box
          borderRadius="lg"
          bg="white"
          borderWidth="1px"
          height="56px"
          width="378px"
        >
          <Image
            src={getLinkUrlInfo(media?.url || '').thumbnailUrl}
            alt={media?.title}
            width="40px"
            height="40px"
            float="left"
            marginTop="7px"
            marginLeft="10px"
            marginRight="8px"
            borderRadius="lg"
          />
          <Title>{media?.title}</Title>
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
          {media?.title}
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
          <Text height="380px" width="350px">
            {media?.description}
          </Text>
          <CharacterCount>{media?.description.length} / 500</CharacterCount>
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
  width: 378px;
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
  right: 70px;
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
