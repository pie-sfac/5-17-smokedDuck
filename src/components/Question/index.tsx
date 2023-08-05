import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';
interface QuestionProps {
  order: number;
  title: string;
  tagName: string;
  onChange: (
    order: number,
    id: string,
    value: string | string[] | boolean
  ) => void;
  type?: string;
  required?: boolean;
  description?: string;
  paragraph?: boolean;
  options?: string[];
  allowMultiple?: boolean;
  addOtherOption?: boolean;
}

interface CurrentQuestion {
  order: number;
  title: string;
  tagName: string;
  type?: string;
  required?: boolean;
  description?: string;
  paragraph?: boolean;
  options?: string[];
  allowMultiple?: boolean;
  addOtherOption?: boolean;
}

export default function Question({
  order,
  title,
  tagName,
  onChange,
  required,
  type,
  description,
  paragraph,
  options,
  allowMultiple,
  addOtherOption,
}: QuestionProps) {
  const [currentQuestion] = useState<CurrentQuestion>({
    order,
    title,
    tagName,
    required,
    description,
    paragraph,
    options,
    allowMultiple,
    addOtherOption,
  });

  const setSpecialtyTitle = useCallback(
    (currentType: string | undefined, title: string) => {
      switch (currentType) {
        case 'PAIN_HSTRY':
          return '통증 정도';
          break;
        case 'CONDITION':
          return '오늘의 컨디션';
          break;
        case 'PAIN_INTV':
          return '통증 문진';
          break;

        default:
          return title;
          break;
      }
    },
    []
  );

  return (
    <QuestionContainer>
      <QuestionHeader
        order={order}
        title={setSpecialtyTitle(type, title)}
        tagName={tagName}
        paragraph={paragraph ? paragraph : false}
        onChange={onChange}
      />
      {tagName === '기본' && (
        <QuestionContent
          onChange={onChange}
          currentQuestion={currentQuestion}
        />
      )}
      <QuestionFooter order={order} onChange={onChange} required={required} />
    </QuestionContainer>
  );
}

const QuestionContainer = styled('div')`
  width: 96%;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
`;
