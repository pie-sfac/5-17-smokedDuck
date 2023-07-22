import React, { useState } from 'react';
import styled from 'styled-components';

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

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
`;



function YoutubeData() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');


  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = event.target.value;
    setUrl(newUrl);
    setError('');
  
    if (newUrl === '') {
      setTitle('');
      setDescription('');
      setThumbnail('');
    } else {

      handleFetchInfo(newUrl);
    }
  };

  function handleFetchInfo (newUrl: string) {
    const videoId = extractVideoIdFromUrl(newUrl);

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=API_KEY`)
      .then((response) => response.json())
      .then((data) => {
        const item = data.items[0];
        setTitle(item.snippet.title);
        setThumbnail(item.snippet.thumbnails?.default?.url || '');
        if (item.snippet.description.length > 500) {
          setDescription(item.snippet.description.slice(0, 500));
        } else {
          setDescription(item.snippet.description);
        }
      })
      .catch((error) => {
        console.error(error);
        setError('유효하지 않은 링크.');
      });
  };

  function extractVideoIdFromUrl (url: string) {
    const match = url.match(/(?:[?&]v=|\/embed\/|\/v\/|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  function handleDescriptionChange (event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    if (value.length <= 500) {
      setDescription(value);
      setError('');
    } else {
      setError('500자까지만 입력 가능합니다.');
    }
  };

  return (
    <Container>
      <h2>센터 링크 추가</h2>
      <p>센터에 미리 운동 영상 링크를 정리하세요.</p>
      <p>회원에게 발송하는 메시지에 간편하게 활용할 수 있습니다.</p>
      
      <InputTitle>링크</InputTitle>
      <InputWrapper>
        <Input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="URL을 입력해주세요"
        />
      </InputWrapper>

      {thumbnail && (
        <ThumbnailBox>
          <ThumbnailImage src={thumbnail} alt="Thumbnail" />
          <Title>{title}</Title>
        </ThumbnailBox>
      )}

      <InputTitle>링크 제목</InputTitle>
      <Input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="링크 제목을 입력해 주세요."
      />

      <InputTitle>메모</InputTitle>
      <DescriptionBox>
        <DescriptionTextarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="링크를 식별하기 위한 간단한 메모를 작성해 주세요. (500자 이내)"
        />
        <CharacterCount>
          {description.length} / 500
        </CharacterCount>
      </DescriptionBox>

      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
};

export default YoutubeData;
