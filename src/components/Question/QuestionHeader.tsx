import styled from '@emotion/styled';

import QuestionMark from '@/assets/QuestionMark.svg';

type QuestionHeaderProps = {
  id: number;
  title: string;
  tagName: string;
};
export default function QuestionHeader({
  id,
  title,
  tagName,
}: QuestionHeaderProps) {
  return (
    <HeaderContainer>
      <TitleContainer>
        {id < 10 ? '0' + id : id}. {title}
        <TagNameContainer>
          <StyledTagName
            style={{
              backgroundColor: tagName === '기본' ? '#EBF1FF' : '#E6F9EA',
              color: tagName === '기본' ? '#6691FF' : '#1FB881',
            }}
          >
            {tagName} 문항
          </StyledTagName>
        </TagNameContainer>
        <img src={QuestionMark} alt={'물음표 아이콘'} />
      </TitleContainer>
      {title === '텍스트' && (
        <OptionContainer>
          <input type="radio" name={`answerType${id}`} id="shortAnswer" />
          &nbsp;
          <label htmlFor="shortAnswer" style={{ fontSize: '0.7rem' }}>
            단답형
          </label>
          &nbsp;
          <input type="radio" name={`answerType${id}`} id="longAnswer" />
          &nbsp;
          <label htmlFor="longAnswer" style={{ fontSize: '0.7rem' }}>
            장문형
          </label>
        </OptionContainer>
      )}
      {title === '선택형' && (
        <OptionContainer>
          <input
            type="checkbox"
            name={`allowDuplicates${id}`}
            id="allowDuplicates"
          />
          &nbsp;
          <label htmlFor="allowDuplicates" style={{ fontSize: '0.7rem' }}>
            중복 선택 허용
          </label>
        </OptionContainer>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled('div')`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const TagNameContainer = styled('div')`
  font-size: 0.6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const StyledTagName = styled('div')`
  width: 3rem;
  height: 1rem;
  padding: 0.2rem;
  margin: 0 0.6rem 0 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebf1ff;
  border-radius: 10px 10px 10px 10px;
`;

const OptionContainer = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
