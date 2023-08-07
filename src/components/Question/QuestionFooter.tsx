import { Switch } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCallback, useContext, useState } from 'react';
import { RxTrash } from 'react-icons/rx';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

import { MainContext } from '@/store';

type QuestionFooterProps = {
  order: number;
  onChange: (
    order: number,
    id: string,
    value: string | string[] | boolean
  ) => void;
  tagName: string;
  required?: boolean;
};

export default function QuestionFooter({
  order,
  onChange,
  tagName,
  required,
}: QuestionFooterProps) {
  const { questionList, setQuestionList } = useContext(MainContext);

  const handleClickedMoveButton = useCallback(
    (moveDirection: string) => {
      const changeOrder = (currentOrder: number) => {
        const tmp = questionList[currentOrder];
        questionList[currentOrder] = questionList[order - 1];
        questionList[order - 1] = tmp;
      };

      if (moveDirection === 'up') {
        if (order === 1) alert('첫번째 문항입니다.');
        changeOrder(order - 2);
      } else if (moveDirection === 'down') {
        if (order === questionList.length) alert('마지막 문항입니다.');
        changeOrder(order);
      }
      questionList.map((question, idx) => (question.order = idx + 1));
    },
    [order, questionList]
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

  const [isRequired, setIsRequired] = useState(required ? required : false);
  return (
    <QuestionFooterContainer
      style={{
        justifyContent: tagName === '기본' ? 'flex-end' : 'space-between',
      }}
    >
      {tagName === '전문' && (
        <EssentialGuideContainer>
          * 필수 응답 항목입니다.
        </EssentialGuideContainer>
      )}
      <BasicElementContainer>
        {tagName === '기본' && (
          <EssentialContainer>
            <label htmlFor="essential">필수</label>
            &nbsp;
            <Switch
              id={'essential'}
              size="sm"
              onChange={() => {
                setIsRequired(prevIsRequired => !prevIsRequired);
                onChange(order, 'required', !isRequired);
              }}
              defaultChecked={isRequired ? true : false}
            />
          </EssentialContainer>
        )}
        <MoveContainer>
          이동 &nbsp;
          <VscTriangleDown onClick={() => handleClickedMoveButton('down')} />
          &nbsp;
          <VscTriangleUp onClick={() => handleClickedMoveButton('up')} />
        </MoveContainer>
        <RemoveContainer onClick={() => handleClickedDeleteButton(order)}>
          삭제 &nbsp;
          <RxTrash />
        </RemoveContainer>
      </BasicElementContainer>
    </QuestionFooterContainer>
  );
}

const QuestionFooterContainer = styled('div')`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
`;

const EssentialContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const EssentialGuideContainer = styled('div')`
  color: #1fb881;
  margin-top: 0.8rem;
`;

const BasicElementContainer = styled('div')`
  display: flex;
  margin-top: 0.8rem;
`;

const MoveContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  cursot: pointer;
`;

const RemoveContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  cursot: pointer;
`;
