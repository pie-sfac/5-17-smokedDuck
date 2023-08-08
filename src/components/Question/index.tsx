import styled from '@emotion/styled';
import { useCallback, useContext } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';
import QuestionOptionalContent from './QuestionOptionalContent';
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
}: QuestionProps) {
  const { questionList, setQuestionList } = useContext(MainContext);

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

        const targetOrder = order - 1;

        const tmp = tmpQuestionList[currentOrder];
        tmpQuestionList[currentOrder] = tmpQuestionList[targetOrder];
        tmpQuestionList[targetOrder] = tmp;

        handleChangedOrder(tmpQuestionList);
      };

      if (moveDirection === 'up') {
        if (order === 1) {
          alert('첫번째 문항입니다.');
          return;
        }
        changeOrder(order - 2);
      } else if (moveDirection === 'down') {
        if (order === questionList.length) {
          alert('마지막 문항입니다.');
          return;
        }
        changeOrder(order);
      }
      questionList.map((question, idx) => (question.order = idx + 1));
    },
    [order, questionList, setQuestionList]
  );

  const handleClickedDeleteButton = useCallback(
    (order: number) => {
      const deletedQuestions = questionList.filter(
        question => question.order !== order
      );
      deletedQuestions.map((question, index) => {
        question.order = index + 1;
      });
      setQuestionList(deletedQuestions);
    },
    [questionList, setQuestionList]
  );

  return (
    <QuestionContainer>
      <QuestionHeader
        order={order}
        title={setSpecialtyTitle(type, title)}
        tagName={tagName}
        paragraph={paragraph ? paragraph : false}
        allowMultiple={allowMultiple}
        onChange={onChange}
      />
      {tagName === '기본' && (
        <QuestionContent
          order={order}
          onChange={onChange}
          title={title}
          description={description}
        />
      )}
      {title === '미디어' && (
        <QuestionOptionalContent
          order={order}
          options={options}
          title={title}
          onChange={onChange}
        />
      )}

      {title === '선택형' && (
        <QuestionOptionalContent
          order={order}
          options={options}
          title={title}
          onChange={onChange}
        />
      )}
      <QuestionFooter
        order={order}
        onChange={onChange}
        tagName={tagName}
        required={required}
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
