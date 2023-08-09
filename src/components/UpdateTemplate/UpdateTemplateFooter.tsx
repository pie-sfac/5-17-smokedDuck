import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

type UpdateTemplateFooterProps = {
  handleClickedSaveButton: (templateId?: number) => Promise<void>;
  id: number;
  validation: { isValidate: boolean; errorMessage: string };
};

export default function UpdateTemplateFooter({
  handleClickedSaveButton,
  id,
  validation,
}: UpdateTemplateFooterProps) {
  return (
    <FooterContainer>
      {!validation.isValidate && (
        <ValidateCaption>{validation.errorMessage}</ValidateCaption>
      )}
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

const ValidateCaption = styled.span`
  font-size: 13px;
  color: red;
  margin-right: 1rem;
`;
