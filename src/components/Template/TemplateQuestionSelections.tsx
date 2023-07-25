import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

type TemplateQuestionSelectionsProps = {
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TemplateQuestionSelections({
  setQuestions,
}: TemplateQuestionSelectionsProps) {
  return (
    <div>
      <QeustionsContainer>
        <Box
          as="button"
          padding={1}
          px={'14px'}
          fontSize={'14px'}
          border={'1px'}
          borderRadius={'20px 20px 20px 20px'}
          borderColor={'#ccd0d5'}
          _hover={{
            bg: '#6691FF',
            borderColor: '#6691FF',
            color: '#FFFFFF',
          }}
          marginRight={2}
          onClick={() => setQuestions(['temporary'])}
        >
          + 기본 문항
        </Box>
        <Box
          as="button"
          padding={1}
          border={'1px'}
          px={'14px'}
          fontSize={'14px'}
          borderRadius={'20px 20px 20px 20px'}
          bg={'none'}
          borderColor={'#ccd0d5'}
          _hover={{
            bg: '#1FB881',
            borderColor: '#1FB881',
            color: '#FFFFFF',
          }}
        >
          + 전문 문항
        </Box>
      </QeustionsContainer>
    </div>
  );
}

const QeustionsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 0 2rem 1rem 2rem;
`;
