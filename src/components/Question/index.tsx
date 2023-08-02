import styled from '@emotion/styled';

import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';
interface AddedSelection {
  _id: number;
  selectionName: string;
}
interface QuestionProps {
  order: number;
  title: string;
  tagName: string;
  onChange: (
    order: number,
    id: string,
    value: string | AddedSelection[] | boolean
  ) => void;
}

export default function Question({
  order,
  title,
  tagName,
  onChange,
}: QuestionProps) {
  return (
    <QuestionContainer>
      <QuestionHeader
        order={order}
        title={title}
        tagName={tagName}
        onChange={onChange}
      />
      {tagName === '기본' && (
        <QuestionContent title={title} order={order} onChange={onChange} />
      )}
      <QuestionFooter order={order} onChange={onChange} />
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
