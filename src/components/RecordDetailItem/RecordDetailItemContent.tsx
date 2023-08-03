import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import RecordDetailCheckOutSelection from '@/components/RecordDetailItem/RecordDetailCheckOutSelection';
import { AddedFile } from '@/types/question.interface';

type QuestionContentProps = {
  title: string;
  description: string;
  options: string[];
  type: string;
  isRecordEdit: boolean;
};

export default function QuestionContent({
  title,
  description,
  options,
  type,
  isRecordEdit,
}: QuestionContentProps) {
  const [addedFiles, setAddedFiles] = useState<AddedFile[]>([]);

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
          setAddedFiles(prevAddedFiles => [
            ...prevAddedFiles,
            {
              _id:
                prevAddedFiles.length === 0
                  ? 1
                  : prevAddedFiles[prevAddedFiles.length - 1]._id + 1,
              path: value,
              filename: currFileName,
            },
          ]);
        });
      }
    },
    []
  );

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
        value={title}
        title={title}
        disabled={!isRecordEdit}
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
        value={description}
        disabled={!isRecordEdit}
      />
      {type === 'MEDIA' && (
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
      {type === 'SELECT' && <RecordDetailCheckOutSelection options={options} />}
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
