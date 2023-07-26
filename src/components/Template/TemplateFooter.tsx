import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

type TemplateFooterProps = {
  questions: string[];
};

export default function TemplateFooter({ questions }: TemplateFooterProps) {
  return (
    <FooterContainer>
      <Button
        fontSize={'1rem'}
        _active={{
          bg: '#6691FF',
          color: '#F2F0F0',
        }}
        borderRadius={'20px 20px 20px 20px'}
        isDisabled={questions.length < 1 ? true : false}
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
