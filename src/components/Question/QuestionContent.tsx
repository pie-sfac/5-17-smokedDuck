import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { AddedFile } from '@/types/question.interface';

type QuestionContentProps = {
  onChange: (
    order: number,
    id: string,
    value: string | string[] | boolean
  ) => void;
  currentQuestion: {
    order: number;
    title: string;
    tagName: string;
    required?: boolean;
    description?: string;
    paragraph?: boolean;
    options?: string[];
    allowMultiple?: boolean;
    addOtherOption?: boolean;
  };
};

export default function QuestionContent({
  onChange,
  currentQuestion,
}: QuestionContentProps) {
  const [addedFiles, setAddedFiles] = useState<AddedFile[]>([]);
  const [currentSelection, setCurrentSelection] = useState('');
  const [addedSelections, setAddedSelections] = useState<string[]>([]);

  const [currentTitle, setCurrentTitle] = useState(currentQuestion.title);
  const [currentDescription, setCurrentDescription] = useState(
    currentQuestion.description
  );
  const [currentOptions, setCurrentOptions] = useState<string[] | undefined>(
    currentQuestion ? currentQuestion.options : []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const clickMediaAttatchmentButton = useCallback(() => {
    if (fileInputRef !== null && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleAddedFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== undefined && e.target.files !== null) {
        const currFile = e.target.files[0];
        const currFileName = currFile.name;

        const promise = new Promise(
          (resolve: (arg: string | ArrayBuffer | null) => void) => {
            const reader = new FileReader();

            reader.readAsDataURL(currFile);
            reader.onload = function () {
              resolve(reader.result);
            };
          }
        );

        await promise.then(value => {
          const createdFile = {
            _id:
              addedFiles.length === 0
                ? 1
                : addedFiles[addedFiles.length - 1]._id + 1,
            path: value,
            filename: currFileName,
          };
          setAddedFiles(prevAddedFiles => [...prevAddedFiles, createdFile]);
        });
      }
    },
    [addedFiles]
  );

  const handleAddedSelections = useCallback(
    (currentSelection: string) => {
      //템플릿 생성 시 화면에 출력될 내용
      setAddedSelections(prevAddedSelections => [
        ...prevAddedSelections,
        currentSelection,
      ]);
      // 템플릿 편집 시 이미 존재하는 보기 내용
      setCurrentOptions(
        prevCurrentOptions =>
          prevCurrentOptions && [...prevCurrentOptions, currentSelection]
      );

      //템플릿 생성 시 추가되는 보기 저장
      addedSelections?.length !== 0 &&
        onChange(currentQuestion.order, 'options', [
          ...addedSelections,
          currentSelection,
        ]);
      setCurrentSelection('');
    },
    [addedSelections, currentQuestion.order, onChange]
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
          onChange(currentQuestion.order, 'title', e.target.value);
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
          onChange(currentQuestion.order, 'description', e.target.value);
        }}
        value={currentDescription}
      />
      {currentQuestion.title === '미디어' && (
        <AddMediaContainer>
          <AddMediaButton
            htmlFor="mediaFile"
            onClickCapture={e => {
              e.stopPropagation();
            }}
            onClick={clickMediaAttatchmentButton}
          >
            + 답변자 미디어 첨부
            <input
              type="file"
              name="mediaFile"
              id="mediaFile"
              accept="image/*, video/*"
              onChange={e => {
                addedFiles.length >= 6
                  ? alert('미디어는 6개까지 첨부 가능합니다.')
                  : handleAddedFile(e);
              }}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </AddMediaButton>
          {addedFiles.length !== 0 && (
            <AddedFileContainer>
              {addedFiles &&
                addedFiles.map(addedFile => (
                  <div key={addedFile._id}>
                    <ChangeMediaButton
                      onClick={() => {
                        setAddedFiles(prevAddedFiles =>
                          prevAddedFiles.filter(
                            prevAddedFile => prevAddedFile._id !== addedFile._id
                          )
                        );
                        clickMediaAttatchmentButton();
                      }}
                    >
                      파일 변경
                    </ChangeMediaButton>
                    {addedFile.filename}
                  </div>
                ))}
            </AddedFileContainer>
          )}
        </AddMediaContainer>
      )}
      {currentQuestion.title === '선택형' && (
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
          {addedSelections?.length !== 0 && (
            <AddedSelectionContainer>
              {addedSelections.map((addedSelection, idx) => (
                <StyledSelection
                  key={addedSelections ? addedSelections.length + idx : 1}
                >
                  {addedSelection}
                  <ChangeMediaButton
                    style={{ marginLeft: '1rem' }}
                    onClick={() =>
                      handleDeleteSelection(
                        addedSelections ? addedSelections.length + idx : 1
                      )
                    }
                  >
                    삭제
                  </ChangeMediaButton>
                </StyledSelection>
              ))}
            </AddedSelectionContainer>
          )}
          {/* 편집모드인 경우 */}
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
`;

const AddMediaButton = styled('label')`
  width: 18rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: normal;
  background-color: rgba(244, 244, 244, 0.5);
  border: 1px dashed #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  margin: 0.5rem 0.5rem 0.5rem 0;
  :hover {
    cursor: pointer;
  }
`;

const AddedFileContainer = styled('div')`
  height: 3rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
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
