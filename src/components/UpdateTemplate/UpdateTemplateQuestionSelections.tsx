import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Condition from '@/assets/Condition.svg';
import Media from '@/assets/Media.svg';
import Pain from '@/assets/Pain.svg';
import PainQuestion from '@/assets/PainQuestion.svg';
import Selections from '@/assets/Selections.svg';
import Text from '@/assets/Text.svg';
import UpdateQuestionBox from '@/components/UpdateTemplate/UpdateQuestion/UpdateQuestionBox';
import { StringQuestionTypes } from '@/types/question.interface';

type UpdateTemplateQuestionSelectionsProps = {
  totalOrder: number;
  questionsListHandler: (
    type: StringQuestionTypes,
    tagName: string,
    totalOrder: number
  ) => void;
};

export default function UpdateTemplateQuestionSelections({
  totalOrder,
  questionsListHandler,
}: UpdateTemplateQuestionSelectionsProps) {
  const [selectedQuestion, setSelectedQuestion] = useState('basic');
  return (
    <EntireQuestionContainer>
      <QeustionsContainer>
        <Box
          as="button"
          padding={1}
          px={'14px'}
          fontSize={'14px'}
          border={'1px'}
          borderRadius={'20px 20px 20px 20px'}
          borderColor={'#ccd0d5'}
          _hover={{
            bg: '#6691FF',
            borderColor: '#6691FF',
            color: '#FFFFFF',
          }}
          marginRight={2}
          onClick={() => setSelectedQuestion('basic')}
        >
          + 기본 문항
        </Box>
        <Box
          as="button"
          padding={1}
          border={'1px'}
          px={'14px'}
          fontSize={'14px'}
          borderRadius={'20px 20px 20px 20px'}
          bg={'none'}
          borderColor={'#ccd0d5'}
          _hover={{
            bg: '#1FB881',
            borderColor: '#1FB881',
            color: '#FFFFFF',
          }}
          onClick={() => setSelectedQuestion('specialty')}
        >
          + 전문 문항
        </Box>
      </QeustionsContainer>
      {selectedQuestion === 'basic' && (
        <QuestionBoxContainer>
          <UpdateQuestionBox
            image={Text}
            tagTitle={'텍스트'}
            description={'텍스트 형식의 답변을 입력하는 문항입니다.'}
            tagName={'기본'}
            margin={'0.4rem'}
            type={'TEXT'}
            questionsListHandler={questionsListHandler}
            totalOrder={totalOrder}
          />
          <UpdateQuestionBox
            image={Media}
            tagTitle={'미디어'}
            description={'이미지 혹은 영상을 답변으로 첨부하는 문항입니다. '}
            tagName={'기본'}
            margin={'0.4rem'}
            type={'MEDIA'}
            questionsListHandler={questionsListHandler}
            totalOrder={totalOrder}
          />
          <UpdateQuestionBox
            image={Selections}
            tagTitle={'선택형'}
            description={'보기 중 선택해서 답변하는 문항입니다.'}
            tagName={'기본'}
            type={'SELECT'}
            questionsListHandler={questionsListHandler}
            totalOrder={totalOrder}
          />
        </QuestionBoxContainer>
      )}
      {selectedQuestion === 'specialty' && (
        <QuestionBoxContainer>
          <UpdateQuestionBox
            image={Pain}
            tagTitle={'통증 정도'}
            description={'회원의 통증 정도를 선택하는 문항입니다.'}
            tagName={'전문'}
            margin={'0.4rem'}
            type={'PAIN_HSTRY'}
            questionsListHandler={questionsListHandler}
            totalOrder={totalOrder}
          />
          <UpdateQuestionBox
            image={Condition}
            tagTitle={'오늘의 컨디션'}
            description={'회원의 컨디션 정도를 선택하는 문항입니다.'}
            tagName={'전문'}
            margin={'0.4rem'}
            type={'CONDITION'}
            questionsListHandler={questionsListHandler}
            totalOrder={totalOrder}
          />
          <UpdateQuestionBox
            image={PainQuestion}
            tagTitle={'통증 문진'}
            description={
              '통증 부위, 유형, 정도, 빈도, 기간을 작성할 수 있는 문항입니다.'
            }
            tagName={'전문'}
            type={'PAIN_INTV'}
            questionsListHandler={questionsListHandler}
            totalOrder={totalOrder}
          />
        </QuestionBoxContainer>
      )}
    </EntireQuestionContainer>
  );
}

const EntireQuestionContainer = styled('div')`
  height: 9rem;
`;

const QeustionsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 0 2rem 1rem 2rem;
`;

const QuestionBoxContainer = styled('div')`
  display: flex;
  margin: 0 2rem 0 2rem;
  justify-content: space-between;
`;
