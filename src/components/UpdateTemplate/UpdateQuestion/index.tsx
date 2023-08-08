import styled from '@emotion/styled';

import { recordQuestionsType } from '@/types/recordDetail.interface';

import UpdateQuestionContent from './UpdateQuestionContent';
import UpdateQuestionFooter from './UpdateQuestionFooter';
import UpdateQuestionHeader from './UpdateQuestionHeader';
import UpdateQuestionOptionalContent from './UpdateQuestionOptionalContent';

interface QuestionProps {
  onChange?: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
  question: recordQuestionsType;
  isCheckOut?: boolean;
}

export default function UpdateQuestion({
  question,
  onChange,
  isCheckOut,
}: QuestionProps) {
  const isBasic = ['TEXT', 'MEDIA', 'SELECT'].includes(question.type);
  return (
    <QuestionContainer>
      <UpdateQuestionHeader
        order={question.order}
        type={question.type}
        isBasic={isBasic}
        paragraph={question.paragraph}
        isCheckOut={isCheckOut ? isCheckOut : false}
        allowMultiple={question.allowMultiple ? question.allowMultiple : false}
        onChange={onChange!}
      />
      {isBasic && (
        <UpdateQuestionContent
          onChange={onChange!}
          question={question}
          isCheckOut={isCheckOut ? isCheckOut : false}
        />
      )}
      {question.type === 'MEDIA' ||
        (question.type === 'SELECT' && (
          <UpdateQuestionOptionalContent
            order={question.order}
            options={question.options}
            type={question.type}
            isCheckOut={isCheckOut ? isCheckOut : false}
            onChange={onChange!}
          />
        ))}
      {isCheckOut ? (
        <></>
      ) : (
        <UpdateQuestionFooter
          order={question.order}
          onChange={onChange!}
          required={question.required}
        />
      )}
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
