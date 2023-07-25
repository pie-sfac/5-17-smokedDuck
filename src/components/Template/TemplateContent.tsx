import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';

import TemplateFooter from './TemplateFooter';
import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function TemplateContent({
  selectedTemplateTitle,
  setSelectedTemplateTitle,
}: TemplateContentProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  return (
    <div>
      {selectedTemplateTitle.length === 0 ? (
        <TemplateSelections
          setSelectedTemplateTitle={setSelectedTemplateTitle}
        />
      ) : (
        <>
          <TemplateSubHeader />
          <QeustionsContainer>
            <Box
              as="button"
              padding={1}
              px={'14px'}
              fontSize={'14px'}
              border={'1px'}
              borderRadius={'20px 20px 20px 20px'}
              borderColor={'#ccd0d5'}
              _hover={{ bg: '#6691FF', color: '#FFFFFF' }}
              marginRight={2}
              onClick={() => setQuestions(['temporary'])}
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
              _hover={{ bg: '#6691FF', color: '#FFFFFF' }}
            >
              + 전문 문항
            </Box>
          </QeustionsContainer>
          <ContentContainer>
            {questions.length === 0 && (
              <EmptyQuestionContainer>
                <img
                  src={EmptyQuestion}
                  alt="문항 없음 이미지"
                  style={{ marginBottom: '0.7rem' }}
                />
                문항이 없습니다.
              </EmptyQuestionContainer>
            )}
          </ContentContainer>
          <TemplateFooter questions={questions} />
        </>
      )}
    </div>
  );
}

const QeustionsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 0 2rem 1rem 2rem;
`;

const ContentContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24rem;
  width: 940;
  margin: 0 2rem 0 2rem;
`;

const EmptyQuestionContainer = styled('div')`
  width: 7em;
  height: 7rem;
  color: #aeaeae;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
