import { Switch } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { RxTrash } from 'react-icons/rx';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

type QuestionFooterProps = {
  order: number;
  onChange: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
  handleDelete: (order: number, isNew: boolean) => void;
  handleMove: (order: number, direction: string) => void;
  required?: boolean;
  isBasic: boolean;
  isNew: boolean;
};

export default function QuestionFooter({
  order,
  onChange,
  handleDelete,
  handleMove,
  required,
  isBasic,
  isNew,
}: QuestionFooterProps) {
  const [isRequired, setIsRequired] = useState(required ? required : false);
  return (
    <QuestionFooterContainer
      style={{
        justifyContent: isBasic ? 'flex-end' : 'space-between',
      }}
    >
      {!isBasic && (
        <EssentialGuideContainer>
          * 필수 응답 항목입니다.
        </EssentialGuideContainer>
      )}
      <BasicElementContainer>
        {isBasic && (
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
          <VscTriangleDown onClick={() => handleMove(order, 'down')} />
          &nbsp;
          <VscTriangleUp onClick={() => handleMove(order, 'up')} />
        </MoveContainer>
        <RemoveContainer onClick={() => handleDelete(order, isNew)}>
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
