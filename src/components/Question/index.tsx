import styled from '@emotion/styled';

import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';

interface QuestionProps {
  _id: number;
  title: string;
  tagName: string;
}

export default function Question({ _id, title, tagName }: QuestionProps) {
  return (
    <QuestionContainer>
      <QuestionHeader id={_id} title={title} tagName={tagName} />
      {tagName === '기본' && <QuestionContent title={title} />}
      <QuestionFooter />
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
