import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { recordQuestionsType } from '@/types/recordDetail.interface';

type QuestionContentProps = {
  onChange: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
  question: recordQuestionsType;
};

export default function QuestionContent({
  onChange,
  question,
}: QuestionContentProps) {
  const [currentSelection, setCurrentSelection] = useState('');
  const [addedSelections, setAddedSelections] = useState<string[]>([]);

  const [currentTitle, setCurrentTitle] = useState(question.title);
  const [currentDescription, setCurrentDescription] = useState(
    question.description
  );
  const [currentOptions, setCurrentOptions] = useState<string[] | undefined>(
    question.options
  );

  const handleAddedSelections = useCallback(
    (currentSelection: string) => {
      //템플릿 생성 시 화면에 출력될 내용
      setAddedSelections(prevAddedSelections => [
        ...prevAddedSelections,
        currentSelection,
      ]);
      //템플릿 생성 시 추가되는 보기 저장
      addedSelections?.length !== 0 &&
        onChange(question.order, 'options', [
          ...addedSelections,
          currentSelection,
        ]);
      setCurrentSelection('');

      // 템플릿 편집 시 이미 존재하는 보기 내용
      setCurrentOptions(
        prevCurrentOptions =>
          prevCurrentOptions && [...prevCurrentOptions, currentSelection]
      );
    },
    [addedSelections, onChange, question.order]
  );

  const handleDeleteSelection = useCallback((targetId: number) => {
    setAddedSelections(prevAddedSelections =>
      prevAddedSelections.filter((_, idx) =>
        prevAddedSelections ? prevAddedSelections.length + idx : 1 !== targetId
      )
    );
  }, []);

  return (
    <QuestionContentContainer>
      <StyledLabel htmlFor="questionTitle">문항 제목</StyledLabel>
      <StyledInput
        type="text"
        name="questionTitle"
        id="questionTitle"
        placeholder="문항 제목을 적어주세요. (최대 50자)"
        style={{
          height: '2.5rem',
          margin: '0.4rem 0 0.4rem 0',
        }}
        onChange={e => {
          setCurrentTitle(e.target.value);
          onChange(question.order, 'title', e.target.value);
        }}
        value={currentTitle}
      />
      <StyledLabel htmlFor="questionDescription">문항 설명</StyledLabel>
      <StyledTextArea
        name="questionDescription"
        id="questionDescription"
        placeholder="문항 설명을 적어주세요. (생략 가능)"
        style={{
          height: '4.2rem',
          margin: '0.4rem 0 0.4rem 0',
        }}
        onChange={e => {
          setCurrentDescription(e.target.value);
          onChange(question.order, 'description', e.target.value);
        }}
        value={currentDescription}
      />
      {question.type === 'MEDIA' && (
        <AddMediaContainer>
          * 답변자 미디어를 첨부할 수 있습니다.
        </AddMediaContainer>
      )}
      {question.type === 'SELECT' && (
        <AddSelectionContainer>
          <StyledLabel htmlFor="questionDescription">보기</StyledLabel>
          <SelectionField>
            <StyledInput
              type="text"
              name="selection"
              id="selection"
              value={currentSelection}
              style={{ width: '95%', height: '2rem' }}
              placeholder="옵션명을 적어주세요."
              onChange={e => setCurrentSelection(e.target.value)}
            />
            <AddSelectionButton
              onClick={() => {
                handleAddedSelections(currentSelection);
              }}
            >
              +
            </AddSelectionButton>
          </SelectionField>
          {currentOptions && (
            <AddedSelectionContainer>
              {currentOptions?.map((currentOption, idx) => (
                <StyledSelection
                  key={currentOptions ? currentOptions.length + idx : 1}
                >
                  {currentOption}
                  <ChangeMediaButton
                    style={{ marginLeft: '1rem' }}
                    onClick={() =>
                      handleDeleteSelection(
                        currentOptions ? currentOptions.length + idx : 1
                      )
                    }
                  >
                    삭제
                  </ChangeMediaButton>
                </StyledSelection>
              ))}
            </AddedSelectionContainer>
          )}
        </AddSelectionContainer>
      )}
    </QuestionContentContainer>
  );
}

const QuestionContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
`;

const StyledLabel = styled('label')`
  font-size: 0.8rem;
`;

const StyledInput = styled('input')`
  font-size: 0.8rem;
  border: 0.2px solid #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  padding: 0.5rem;
  text-align: top;
  &::placeholder {
    color: #cfcfcf;
    font-size: 0.8rem;
  }
`;

const StyledTextArea = styled('textarea')`
  font-size: 0.8rem;
  border: 0.2px solid #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  padding: 0.5rem;
  &::placeholder {
    color: #cfcfcf;
    font-size: 0.8rem;
  }
`;

const AddMediaContainer = styled('div')`
  display: flex;
  align-items: center;
  color: #aeaeae;
  font-size: 0.8rem;
  margin: 0.2rem;
`;

const ChangeMediaButton = styled('button')`
  background-color: #ebf1ff;
  font-weight: normal;
  font-size: 0.5rem;
  margin-right: 0.4rem;
  padding: 0.3rem;
  border-radius: 10px 10px 10px 10px;
`;

const AddSelectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const SelectionField = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const AddSelectionButton = styled('button')`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
  background-color: #f4f4f4;
  padding: 0;
`;

const AddedSelectionContainer = styled('div')`
  background-color: rgba(244, 244, 244, 0.5);
  border-radius: 10px 10px 10px 10px;
  margin-top: 1rem;
`;

const StyledSelection = styled('div')`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 1rem 1rem 1rem;
`;
