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
      <QuestionContent />
      <QuestionFooter />
    </QuestionContainer>
  );
}

const QuestionContainer = styled('div')`
  width: 96%;
  display: flex;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem 1rem 0 1rem;
`;
