import { Switch } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { RxTrash } from 'react-icons/rx';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

type QuestionFooterProps = {
  order: number;
  onChange: (
    order: number,
    id: string,
    value: string | string[] | boolean
  ) => void;
  required?: boolean;
};

export default function QuestionFooter({
  order,
  onChange,
  required,
}: QuestionFooterProps) {
  const [isRequired, setIsRequired] = useState(required ? required : false);
  return (
    <QuestionFooterContainer>
      <EssentialContainer>
        <label htmlFor="essential">필수</label>
        &nbsp;
        <Switch
          id={'essential'}
          size="sm"
          onChange={() => {
            setIsRequired(prevIsRequired => !prevIsRequired);
            onChange(order, 'required', isRequired);
          }}
          defaultChecked={isRequired ? true : false}
        />
      </EssentialContainer>
      <MoveContainer>
        이동 &nbsp;
        <VscTriangleDown />
        &nbsp;
        <VscTriangleUp />
      </MoveContainer>
      <RemoveContainer>
        삭제 &nbsp;
        <RxTrash />
      </RemoveContainer>
    </QuestionFooterContainer>
  );
}

const QuestionFooterContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
`;

const EssentialContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const MoveContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const RemoveContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;
