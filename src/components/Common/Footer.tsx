import { Button, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

type Footer = {
  onClick: () => void;
  buttonContent: string;
};

export default function Footer({ onClick, buttonContent }: Footer) {
  return (
    <FooterContainer>
      <BlueButton onClick={onClick}>{buttonContent}</BlueButton>
    </FooterContainer>
  );
}

const FooterContainer = styled('div')`
  width: 100%;
`;

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
    position: 'absolute',
    bottom: '2rem',
    right: '1rem',
  },
});
