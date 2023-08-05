import styled from '@emotion/styled';
import { useContext } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';
import { recordQuestionsType } from '@/types/recordDetail.interface';

type QuestionBoxProps = {
  image: string;
  title: string;
  description: string;
  tagName: string;
  margin?: string;
  type: 'TEXT' | 'MEDIA' | 'SELECT' | 'PAIN_HSTRY' | 'CONDITION' | 'PAIN_INTV';
  totalQuestionList: recordQuestionsType[];
  setTotalQuestionList: React.Dispatch<
    React.SetStateAction<recordQuestionsType[]>
  >;
  addQuestions: Questions[];
  setAddQuestions: React.Dispatch<React.SetStateAction<Questions[]>>;
};
export default function QuestionBox({
  image,
  title,
  description,
  tagName,
  margin,
  type,
  totalQuestionList,
  setTotalQuestionList,
  addQuestions,
  setAddQuestions,
}: QuestionBoxProps) {
  const { questionList, setQuestionList } = useContext(MainContext);

  return (
    <QuestionBoxConatiner
      style={{
        marginRight: margin,
      }}
      onClick={() => {
        setQuestionList([
          ...questionList,
          {
            type,
            order:
              totalQuestionList.length === 0
                ? 1
                : totalQuestionList[totalQuestionList.length - 1].order + 1,
            required: false,
            title,
            tagName,
            description: '',
            paragraph: false,
            options: [],
            allowMultiple: false,
            addOtherOption: false,
          },
        ]);
        setTotalQuestionList([
          ...totalQuestionList,
          {
            id:
              totalQuestionList.length === 0
                ? 1
                : totalQuestionList[totalQuestionList.length - 1].order + 1,
            type,
            order:
              totalQuestionList.length === 0
                ? 1
                : totalQuestionList[totalQuestionList.length - 1].order + 1,
            required: false,
            title,
            tagName,
            description: '',
            paragraph: false,
            options: [],
            allowMultiple: false,
            addOtherOption: false,
          },
        ]);
        setAddQuestions([
          ...addQuestions,
          {
            type,
            order:
              totalQuestionList.length === 0
                ? 1
                : totalQuestionList[totalQuestionList.length - 1].order + 1,
            required: false,
            title,
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
          <div style={{ fontSize: '0.8rem' }}>{title}</div>
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
