import styled from '@emotion/styled';
import { useContext } from 'react';

import QuestionMark from '@/assets/QuestionMark.svg';
import { MainContext } from '@/store';

type RecordDetailItemHeaderPropsType = {
  id: number;
  title: string;
  isbasic: boolean;
  type: string;
};

export default function RecordDetailItemHeader({
  id,
  title,
  isbasic,
  type,
}: RecordDetailItemHeaderPropsType) {
  const { isRecordEdit } = useContext(MainContext);
  return (
    <HeaderContainer>
      <TitleContainer>
        {id < 10 ? '0' + id : id}. {title}
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
      {type === 'SELECT' && (
        <OptionContainer>
          <input
            type="checkbox"
            name={`allowDuplicates${id}`}
            id="allowDuplicates"
            disabled={isRecordEdit}
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
