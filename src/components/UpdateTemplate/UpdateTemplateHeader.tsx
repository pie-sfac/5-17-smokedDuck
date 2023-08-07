import styled from '@emotion/styled';

import QuestionMark from '@/assets/QuestionMark.svg';

type UpdateTemplateHeaderPropsType = {
  id: number;
  title: string;
  type: string;
  paragraph: boolean;
  allowMultiple: boolean;
  isbasic: boolean;
  isRecordEdit: boolean;
};

export default function UpdateTemplateHeader({
  id,
  title,
  type,
  paragraph,
  allowMultiple,
  isbasic,
  isRecordEdit,
}: UpdateTemplateHeaderPropsType) {
  return (
    <HeaderContainer>
      <TitleContainer>
        {title}
        <TagNameContainer>
          <StyledTagName
            style={{
              backgroundColor: isbasic ? '#EBF1FF' : '#E6F9EA',
              color: isbasic ? '#6691FF' : '#1FB881',
            }}
          >
            {isbasic ? '기본' : '전문'} 문항
          </StyledTagName>
        </TagNameContainer>
        <img src={QuestionMark} alt={'물음표 아이콘'} />
      </TitleContainer>
      {type === 'TEXT' && (
        <OptionContainer>
          <input
            type="radio"
            name={`answerType${id}`}
            id="shortAnswer"
            disabled={!isRecordEdit}
            checked={paragraph}
          />
          &nbsp;
          <label htmlFor="shortAnswer" style={{ fontSize: '0.7rem' }}>
            단답형
          </label>
          &nbsp;
          <input
            type="radio"
            name={`answerType${id}`}
            id="longAnswer"
            disabled={!isRecordEdit}
            checked={!paragraph}
          />
          &nbsp;
          <label htmlFor="longAnswer" style={{ fontSize: '0.7rem' }}>
            장문형
          </label>
        </OptionContainer>
      )}
      {type === 'SELECT' && (
        <OptionContainer>
          <input
            type="checkbox"
            name={`allowDuplicates${id}`}
            id="allowDuplicates"
            disabled={isRecordEdit}
            checked={allowMultiple}
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
