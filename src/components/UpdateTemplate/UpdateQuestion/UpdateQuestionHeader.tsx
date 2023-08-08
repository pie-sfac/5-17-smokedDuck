import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import QuestionMark from '@/assets/QuestionMark.svg';

type QuestionHeaderProps = {
  order: number;
  type: string;
  paragraph: boolean | undefined;
  isBasic: boolean;
  isCheckOut: boolean;
  allowMultiple: boolean;
  onChange: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
};

export default function UpdateQuestionHeader({
  order,
  type,
  paragraph,
  onChange,
  isBasic,
  allowMultiple,
  isCheckOut,
}: QuestionHeaderProps) {
  const [isAllowMultiple, setIsAllowMultiple] = useState(allowMultiple);
  const [isParagraph, setIsParagraph] = useState(paragraph);

  const setTitle = useCallback((type: string) => {
    switch (type) {
      case 'PAIN_HSTRY':
        return '통증 정도';
        break;
      case 'CONDITION':
        return '오늘의 컨디션';
        break;
      case 'PAIN_INTV':
        return '통증 문진';
        break;
      case 'TEXT':
        return '텍스트';
        break;
      case 'SELECT':
        return '선택형';
        break;
      case 'MEDIA':
        return '미디어';
        break;
    }
  }, []);

  return (
    <HeaderContainer>
      <TitleContainer>
        {order < 10 ? '0' + order : order}. {setTitle(type)}
        <TagNameContainer>
          <StyledTagName
            style={{
              backgroundColor: isBasic ? '#EBF1FF' : '#E6F9EA',
              color: isBasic ? '#6691FF' : '#1FB881',
            }}
          >
            {isBasic ? '기본' : '전문'} 문항
          </StyledTagName>
        </TagNameContainer>
        <img src={QuestionMark} alt={'물음표 아이콘'} />
      </TitleContainer>
      {type === 'TEXT' && (
        <OptionContainer>
          <input
            type="radio"
            name={`answerType${order}`}
            id="shortAnswer"
            onChange={() => {
              setIsParagraph(prevIsParagraph => !prevIsParagraph);
              onChange(order, 'paragraph', false);
            }}
            checked={isParagraph ? false : true}
            disabled={isCheckOut}
          />
          &nbsp;
          <label htmlFor="shortAnswer" style={{ fontSize: '0.7rem' }}>
            단답형
          </label>
          &nbsp;
          <input
            type="radio"
            name={`answerType${order}`}
            id="longAnswer"
            onChange={() => {
              setIsParagraph(prevIsParagraph => !prevIsParagraph);
              onChange(order, 'paragraph', true);
            }}
            checked={isParagraph ? true : false}
            disabled={isCheckOut}
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
            name={`allowDuplicates${order}`}
            id="allowDuplicates"
            onChange={() => {
              setIsAllowMultiple(prevIsAllowMultiple => !prevIsAllowMultiple);
            }}
            onBlur={() => {
              onChange(order, 'allowMultiple', isAllowMultiple);
            }}
            disabled={isCheckOut}
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
