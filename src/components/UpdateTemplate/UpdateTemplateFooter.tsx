import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

type UpdateTemplateFooterProps = {
  handleClickedSaveButton: (templateId?: number) => Promise<void>;
  id: number;
};

export default function UpdateTemplateFooter({
  handleClickedSaveButton,
  id,
}: UpdateTemplateFooterProps) {
  return (
    <FooterContainer>
      <Button
        fontSize={'1rem'}
        _active={{
          bg: '#6691FF',
          color: '#F2F0F0',
        }}
        borderRadius={'20px 20px 20px 20px'}
        onClick={() => handleClickedSaveButton(id)}
      >
        저장
      </Button>
    </FooterContainer>
  );
}

const FooterContainer = styled('div')`
  margin: 0.2rem 2rem 0.2rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
