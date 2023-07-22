import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useYoutubeVideo } from 'hooks/UseYoutubeVideo';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 912px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 912px;
  margin-right: 10px;
`;


const ThumbnailBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  width: 912px
`;

const ThumbnailImage = styled.img`
  width: 120px;
  margin-right: 10px;
`;

const Title = styled.p`
  font-size: 14px;
`;

const InputTitle = styled.h4``;

const DescriptionBox = styled.div`
  position: relative;
`;

const DescriptionTextarea = styled.textarea`
  margin-bottom: 20px;
  width: 912px;
  height: 150px;
  resize: none;
`;

const CharacterCount = styled.p`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #777;
`;


function LinkComponent() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {youtubeVideo, handler} = useYoutubeVideo();
  useEffect(()=>{
    setDescription(youtubeVideo?.description||'');
  },[youtubeVideo])

  
  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setTitle(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    console.log(value);
      setDescription(value.slice(0, 500));
  }
  
  return (
    <Container>
      <h2>센터 링크 추가</h2>
      <p>센터에 미리 운동 영상 링크를 정리하세요.</p>
      <p>회원에게 발송하는 메시지에 간편하게 활용할 수 있습니다.</p>
      
      <InputTitle>링크</InputTitle>

      <InputWrapper>
        <Input
          type="text"
          onChange={handler}
          placeholder="URL을 입력해주세요"
        />
      </InputWrapper>

      {youtubeVideo && (
        youtubeVideo.thumbnailUrl && <ThumbnailBox>
          <ThumbnailImage src={youtubeVideo.thumbnailUrl} alt="Thumbnail" />
          <Title>{youtubeVideo.title}</Title>
        </ThumbnailBox>
      )}

      <InputTitle>링크 제목</InputTitle>

      <Input
        type="text"
        value={title || youtubeVideo?.title}
        onChange={handleTitleChange}
        placeholder="링크 제목을 입력해 주세요."
      />

      <InputTitle>메모</InputTitle>

      <DescriptionBox>
        <DescriptionTextarea
          value={description || youtubeVideo?.description}
          onChange={handleDescriptionChange}
          placeholder="링크를 식별하기 위한 간단한 메모를 작성해 주세요. (500자 이내)"
        />

        <CharacterCount>
          {description.length} / 500
        </CharacterCount>
      </DescriptionBox>

    </Container>
  );
}

export default LinkComponent;
