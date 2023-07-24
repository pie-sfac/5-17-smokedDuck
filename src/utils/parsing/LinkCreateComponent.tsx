import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { useYoutubeVideo } from '@/hooks/UseYoutubeVideo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 912px;
`;

const CreateHeader = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const InputTitle = styled.h4`
  margin-botton: 10px;
  margin-top: 10px;
`;

const DescriptionBox = styled.div`
  position: relative;
`;

const CharacterCount = styled.p`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #777;
`;

const ButtonPlace = styled.div`
  position: absolute;
  right: 34px;
  bottom: 14px;
`;

const StyledButton = styled(Button)`
  border: none;
  border-radius: 70;
  width: 40px;
  font-size: 12px;
  height: 24px;
  background-color: ${props => (props.disabled ? '#f4f4f4' : '#2D62EA')};
  color: ${props => (props.disabled ? '#aeaeae' : '#ffffff')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

function LinkCreateComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { youtubeVideo, handler } = useYoutubeVideo();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setDescription(youtubeVideo?.description || '');
  }, [youtubeVideo]);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    updateFormCompletion();
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    setDescription(value.slice(0, 500));
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
    updateFormCompletion();
  }

  function updateFormCompletion() {
    const isCategoryValid = category.trim() !== '';
    const isTitleValid =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      title.trim() !== '' || youtubeVideo?.title?.trim() !== '';

    setIsFormComplete(isCategoryValid && isTitleValid);
  }

  return (
    <Container>
      <CreateHeader>
        <Heading as="h5" size="md">
          센터 링크
        </Heading>
        <p>센터에 미리 운동 영상 링크를 정리하세요.</p>
        <p>회원에게 발송하는 메시지에 간편하게 활용할 수 있습니다.</p>
      </CreateHeader>

      <FormControl isRequired>
        <FormLabel>카테고리</FormLabel>

        <Select
          placeholder="카테고리를 선택해 주세요."
          marginBottom="20px"
          onChange={handleCategoryChange}
        >
          <option value="1">test 1</option>
          <option value="2">test 2</option>
        </Select>

        <FormLabel>링크</FormLabel>

        <InputWrapper>
          <Input
            type="text"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            onChange={handler}
            placeholder="URL을 입력해주세요"
            width="912px"
            marginBottom="20px"
          />
        </InputWrapper>

        <FormLabel>링크 제목</FormLabel>

        <Input
          type="text"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          value={title || youtubeVideo?.title}
          onChange={handleTitleChange}
          placeholder="링크 제목을 입력해 주세요."
          width="912px"
          marginBottom="20px"
        />
      </FormControl>
      <InputTitle>메모</InputTitle>

      <DescriptionBox>
        <Textarea
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          value={description || youtubeVideo?.description}
          onChange={handleDescriptionChange}
          placeholder="링크를 식별하기 위한 간단한 메모를 작성해 주세요. (500자 이내)"
          resize="none"
          height="150px"
          width="912px"
        />

        <CharacterCount>{description.length} / 500</CharacterCount>
      </DescriptionBox>
      <ButtonPlace>
        <StyledButton
          border="none"
          backgroundColor="#2D62EA"
          color="#FFFFFF"
          borderRadius="70"
          width="40px"
          height="24px"
          disabled={!isFormComplete}
        >
          완료
        </StyledButton>
      </ButtonPlace>
    </Container>
  );
}

export default LinkCreateComponent;
