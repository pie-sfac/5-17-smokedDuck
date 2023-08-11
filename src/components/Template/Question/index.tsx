import styled from '@emotion/styled';
import { useCallback, useContext } from 'react';

import { QueustionContext } from '@/store/QuestionProvider';
import { CheckedSpecialQuestions, Questions } from '@/types/question.interface';

import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';
import QuestionOptionalContent from './QuestionOptionalContent';

type QuestionProps = {
  onChange: (
    order: number,
    id: string,
    value: string | string[] | boolean
  ) => void;
  question: Questions;
  setIsCheckedSpecialQuestions: React.Dispatch<
    React.SetStateAction<CheckedSpecialQuestions>
  >;
};

export default function Question({
  onChange,
  question,
  setIsCheckedSpecialQuestions,
}: QuestionProps) {
  const { questionList, setQuestionList } = useContext(QueustionContext);

  const handleClickedMoveButton = useCallback(
    (moveDirection: string) => {
      const handleChangedOrder = (tmpQuestionList: Questions[]) => {
        const copyedOrderList = [...tmpQuestionList];
        const changedOrderList = copyedOrderList.map((question, idx) => ({
          ...question,
          order: idx + 1,
        }));
        setQuestionList(changedOrderList);
      };
      const changeOrder = (currentOrder: number) => {
        const tmpQuestionList = [...questionList];

        const targetOrder = question.order - 1;

        const tmp = tmpQuestionList[currentOrder];
        tmpQuestionList[currentOrder] = tmpQuestionList[targetOrder];
        tmpQuestionList[targetOrder] = tmp;

        handleChangedOrder(tmpQuestionList);
      };

      if (moveDirection === 'up') {
        if (question.order === 1) {
          alert('첫번째 문항입니다.');
          return;
        }
        changeOrder(question.order - 2);
      } else if (moveDirection === 'down') {
        if (question.order === questionList.length) {
          alert('마지막 문항입니다.');
          return;
        }
        changeOrder(question.order);
      }
      questionList.map((question, idx) => (question.order = idx + 1));
    },
    [question.order, questionList, setQuestionList]
  );

  const handleClickedDeleteButton = useCallback(
    (order: number) => {
      const targetDeleteQuestion = questionList.filter(
        question => question.order === order
      );
      if (targetDeleteQuestion[0].type === 'PAIN_HSTRY') {
        setIsCheckedSpecialQuestions(prevIsChecked => ({
          ...prevIsChecked,
          isPAIN_HSTRY: false,
        }));
      } else if (targetDeleteQuestion[0].type === 'CONDITION') {
        setIsCheckedSpecialQuestions(prevIsChecked => ({
          ...prevIsChecked,
          isCONDITION: false,
        }));
      } else if (targetDeleteQuestion[0].type === 'PAIN_INTV') {
        setIsCheckedSpecialQuestions(prevIsChecked => ({
          ...prevIsChecked,
          isPAIN_INTV: false,
        }));
      }
      const deletedQuestions = questionList.filter(
        question => question.order !== order
      );
      deletedQuestions.map((question, index) => {
        question.order = index + 1;
      });
      setQuestionList(deletedQuestions);
    },
    [questionList, setIsCheckedSpecialQuestions, setQuestionList]
  );

  const isBasic = ['TEXT', 'MEDIA', 'SELECT'].includes(question.type);

  return (
    <QuestionContainer>
      <QuestionHeader
        order={question.order}
        type={question.type}
        paragraph={question.paragraph}
        isBasic={isBasic}
        allowMultiple={question.allowMultiple}
        onChange={onChange}
      />
      {isBasic && <QuestionContent onChange={onChange} question={question} />}
      {question.type === 'MEDIA' && (
        <QuestionOptionalContent
          order={question.order}
          options={question.options}
          type={question.type}
          onChange={onChange}
        />
      )}

      {question.type === 'SELECT' && (
        <QuestionOptionalContent
          order={question.order}
          options={question.options}
          type={question.type}
          onChange={onChange}
        />
      )}
      <QuestionFooter
        order={question.order}
        onChange={onChange}
        tagName={question.tagName}
        required={question.required}
        handleClickedDeleteButton={handleClickedDeleteButton}
        handleClickedMoveButton={handleClickedMoveButton}
      />
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
