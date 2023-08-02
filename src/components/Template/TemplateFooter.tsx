import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useContext } from 'react';

import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

type TemplateFooterProps = {
  onChange: (id: string, value: string | Questions[]) => void;
};
export default function TemplateFooter({ onChange }: TemplateFooterProps) {
  const { questionList } = useContext(MainContext);

  const handleClickedSaveButton = () => {
    onChange('question', questionList);
  };

  return (
    <FooterContainer>
      <Button
        fontSize={'1rem'}
        _active={{
          bg: '#6691FF',
          color: '#F2F0F0',
        }}
        borderRadius={'20px 20px 20px 20px'}
        isDisabled={questionList.length < 1 ? true : false}
        onClick={handleClickedSaveButton}
      >
        저장
      </Button>
    </FooterContainer>
  );
}

const FooterContainer = styled('div')`
  height: 3.5rem;
  margin: 0.2rem 2rem 0.2rem 2rem;
  display: flex;
  justify-content: flex-end;
`;
