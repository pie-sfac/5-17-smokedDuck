import { useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useContext } from 'react';

import { MainContext } from '@/store';

type checkedSpecialQuestions = {
  [key: string]: boolean;
  isPAIN_HSTRY: boolean;
  isCONDITION: boolean;
  isPAIN_INTV: boolean;
};

type QuestionBoxProps = {
  image: string;
  tagTitle: string;
  description: string;
  tagName: string;
  margin?: string;
  type: 'TEXT' | 'MEDIA' | 'SELECT' | 'PAIN_HSTRY' | 'CONDITION' | 'PAIN_INTV';
  isCheckedSpecialQuestions?: checkedSpecialQuestions;
  setIsCheckedSpecialQuestions?: React.Dispatch<
    React.SetStateAction<checkedSpecialQuestions>
  >;
};

export default function QuestionBox({
  image,
  tagTitle,
  description,
  tagName,
  margin,
  type,
  isCheckedSpecialQuestions,
  setIsCheckedSpecialQuestions,
}: QuestionBoxProps) {
  const { questionList, setQuestionList } = useContext(MainContext);
  const toast = useToast();

  return (
    <QuestionBoxConatiner
      style={{
        marginRight: margin,
      }}
      onClick={() => {
        if (type === 'PAIN_HSTRY') {
          if (isCheckedSpecialQuestions?.isPAIN_HSTRY) {
            toast({
              title: '전문 문항 중복',
              description: '전문 문항은 중복으로 추가할 수 없습니다.',
              status: 'error',
              duration: 1200,
              isClosable: true,
            });
            return;
          } else {
            setIsCheckedSpecialQuestions &&
              setIsCheckedSpecialQuestions(prevIsChecked => ({
                ...prevIsChecked,
                isPAIN_HSTRY: true,
              }));
          }
        } else if (type === 'CONDITION') {
          if (isCheckedSpecialQuestions?.isCONDITION) {
            toast({
              title: '전문 문항 중복',
              description: '전문 문항은 중복으로 추가할 수 없습니다.',
              status: 'error',
              duration: 1200,
              isClosable: true,
            });
            return;
          } else {
            setIsCheckedSpecialQuestions &&
              setIsCheckedSpecialQuestions(prevIsChecked => ({
                ...prevIsChecked,
                isCONDITION: true,
              }));
          }
        } else if (type === 'PAIN_INTV') {
          if (isCheckedSpecialQuestions?.isPAIN_INTV) {
            toast({
              title: '전문 문항 중복',
              description: '전문 문항은 중복으로 추가할 수 없습니다.',
              status: 'error',
              duration: 1200,
              isClosable: true,
            });
            return;
          } else {
            setIsCheckedSpecialQuestions &&
              setIsCheckedSpecialQuestions(prevIsChecked => ({
                ...prevIsChecked,
                isPAIN_INTV: true,
              }));
          }
        }
        if (questionList.length === 30) {
          toast({
            title: '문항 수 초과',
            description: '템플릿당 문항수는 30개를 초과할 수 없습니다.',
            status: 'error',
            duration: 1200,
            isClosable: true,
          });
          return;
        }
        setQuestionList([
          ...questionList,
          {
            id: 0,
            type,
            order:
              questionList.length === 0
                ? 1
                : questionList[questionList.length - 1].order + 1,
            required: tagName === '전문' ? true : false,
            title: '',
            tagName,
            description: '',
            paragraph: false,
            options: [],
            allowMultiple: false,
            addOtherOption: false,
          },
        ]);
      }}
    >
      <TagNameContainer>
        <StyledTagName
          style={{
            backgroundColor: tagName === '기본' ? '#EBF1FF' : '#E6F9EA',
            color: tagName === '기본' ? '#6691FF' : '#1FB881',
          }}
        >
          {tagName} 문항
        </StyledTagName>
      </TagNameContainer>
      <EntireContentContainer>
        <img src={image} alt={'아이콘 이미지'} width={45} height={30} />
        <TextContentContainer>
          <div style={{ fontSize: '0.9rem' }}>{tagTitle}</div>
          <div style={{ fontSize: '0.6rem', width: '12.5rem' }}>
            {description}
          </div>
        </TextContentContainer>
      </EntireContentContainer>
    </QuestionBoxConatiner>
  );
}

const QuestionBoxConatiner = styled('div')`
  width: 18.6rem;
  height: 5.3rem;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
  cursor: pointer;
`;

const TagNameContainer = styled('div')`
  font-size: 0.6rem;
  display: flex;
  justify-content: flex-end;
  margin: 0.6rem 0.6rem 0 0.6rem;
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

const EntireContentContainer = styled('div')`
  display: flex;
  justify-content: space-around;
  height: 3rem;
`;

const TextContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;
