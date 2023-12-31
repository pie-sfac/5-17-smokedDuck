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
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import { getLinkDetails, LINK_URL } from '@/apis/Media';
import { CategoryResponse } from '@/types/category.interface';
import { FormData } from '@/types/media.interface';
import useCategory from '@/utils/categoryData';
import { getLinkUrlInfo } from '@/utils/validations/linkUtils';
import { useYoutubeVideo } from '@/utils/youtubeData';

interface LinkFormProps {
  onSubmit: (data: FormData) => void;
  linkId?: number;
}

export default function LinkForm({ onSubmit, linkId }: LinkFormProps) {
  const { data: media } = useSWR(
    linkId ? `${LINK_URL}${linkId}` : null,
    linkId ? () => getLinkDetails(linkId) : null
  );

  const [linkUrl, setLinkUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { youtubeVideo, handler } = useYoutubeVideo();

  const isRequiredFieldsEmpty = !category || !linkUrl || !title;

  const handleLinkChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const link = event.target.value;
      setLinkUrl(link);
      handler(link);
    },
    [handler]
  );
  const {
    categoryListData: categories,
    isLoading: isLoadingCategories,
    mutate,
  } = useCategory();

  const handleCategoryCount = useCallback(
    (categoryId: number) => {
      if (categories) {
        const pickedCategory = categories.categories.find(
          item => item.id === categoryId
        );

        const pickedCategoryIndex = categories.categories.findIndex(
          item => item.id === categoryId
        );
        if (pickedCategory && pickedCategoryIndex) {
          const newCategory = {
            ...pickedCategory,
            totalCount: pickedCategory.totalCount + 1,
          };

          categories.categories.splice(pickedCategoryIndex, 1, newCategory);

          mutate(categories, false);
        }
      }
    },
    [categories, mutate]
  );

  useEffect(() => {
    if (media) {
      setTitle((media && media.title) || '');
      setDescription((media && media.description) || '');
      setLinkUrl(getLinkUrlInfo((media && media.url) || '').linkUrl);
      if (categories) setCategory(media && media.category?.id);
    }
  }, [categories, media]);

  useEffect(() => {
    const updateFormCompletion = () => {
      const isFormComplete = new Boolean(category && title && linkUrl && true);
      setIsFormComplete(isFormComplete.valueOf());
    };
    updateFormCompletion();
  }, [category, title, linkUrl]);

  useEffect(() => {
    setTitle(
      (youtubeVideo && youtubeVideo.title) || (media && media.title) || ''
    );
    setDescription(
      (youtubeVideo && youtubeVideo.description) ||
        (media && media.description) ||
        ''
    );
  }, [media, youtubeVideo]);

  const handleSubmit = useCallback(() => {
    if (isRequiredFieldsEmpty) {
      return;
    }
    const formData = {
      category: category || -1,
      linkUrl: linkUrl || getLinkUrlInfo(media?.url || '').linkUrl,
      title,
      description,
    };

    onSubmit({
      ...formData,
      thumbnailUrl:
        (youtubeVideo && youtubeVideo.thumbnailUrl) ||
        getLinkUrlInfo(media?.url || '').thumbnailUrl ||
        '',
      title: title || (youtubeVideo && youtubeVideo.title) || '',
    });

    handleCategoryCount(category);
  }, [
    isRequiredFieldsEmpty,
    category,
    linkUrl,
    media?.url,
    title,
    description,
    onSubmit,
    youtubeVideo,
    handleCategoryCount,
  ]);

  return (
    <Container>
      <CreateHeader>
        <Heading as="h5" size="sm" marginBottom="6px">
          센터 링크
        </Heading>
        <p>센터에 미리 운동 영상 링크를 정리하세요.</p>
        <p>회원에게 발송하는 메시지에 간편하게 활용할 수 있습니다.</p>
      </CreateHeader>

      <FormControl isRequired>
        <FormLabel>카테고리</FormLabel>
        {isLoadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <Select
            placeholder="카테고리를 선택해 주세요."
            fontSize="0.9rem"
            marginBottom="10px"
            value={category}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setCategory(Number(event.target.value));
            }}
          >
            {categories?.categories.map((categoryInfo: CategoryResponse) => (
              <option key={categoryInfo.id} value={categoryInfo.id}>
                {categoryInfo.title}
              </option>
            ))}
          </Select>
        )}

        <FormLabel>링크</FormLabel>

        <InputWrapper>
          <Input
            type="text"
            onChange={handleLinkChange}
            placeholder="URL을 입력해주세요"
            fontSize="0.9rem"
            width="800px"
            marginBottom="10px"
            value={linkUrl}
          />
        </InputWrapper>

        <FormLabel>링크 제목</FormLabel>

        <Input
          type="text"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
          placeholder="링크 제목을 입력해 주세요."
          fontSize="0.9rem"
          width="800px"
          marginBottom="10px"
        />
      </FormControl>
      <InputTitle>메모</InputTitle>

      <DescriptionBox>
        <Textarea
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target;
            setDescription(value.slice(0, 500));
          }}
          placeholder="링크를 식별하기 위한 간단한 메모를 작성해 주세요. (500자 이내)"
          resize="none"
          height="120px"
          width="800px"
          fontSize="0.9rem"
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
          disabled={!isFormComplete || isRequiredFieldsEmpty}
          onClick={handleSubmit}
        >
          저장
        </StyledButton>
      </ButtonPlace>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
`;

const CreateHeader = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 6px;
`;

const InputTitle = styled.h4`
  margin-bottom: 6px;
  margin-top: 6px;
`;

const DescriptionBox = styled.div`
  position: relative;
`;

const CharacterCount = styled.p`
  position: absolute;
  bottom: 6px;
  right: 6px;
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
  width: 60px;
  font-size: 1rem;
  height: 40px;
  padding: 0 16px;

  background-color: ${props => (props.disabled ? '#f4f4f4' : '#2D62EA')};
  color: ${props => (props.disabled ? '#aeaeae' : '#ffffff')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;
