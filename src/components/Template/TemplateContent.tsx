import styled from '@emotion/styled';
import { useState } from 'react';

import EmptyQuestion from '@/assets/EmptyQuestion.svg';

import TemplateFooter from './TemplateFooter';
import TemplateQuestionSelections from './TemplateQuestionSelections';
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
          <TemplateQuestionSelections setQuestions={setQuestions} />
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

const ContentContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13rem;
  width: 940;
  margin: 0 2rem 0 2rem;
  overflow: auto;
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
