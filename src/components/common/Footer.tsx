import { Button, chakra } from '@chakra-ui/react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { MainContext } from '@/store';

export default function Footer() {
  const { pathname } = useLocation();
  const { setRecordModalState, setMediaModalState } = useContext(MainContext);

  if (pathname === '/media') {
    return (
      <BlueButton onClick={() => setMediaModalState(true)}>
        + 링크 추가
      </BlueButton>
    );
  } else if (pathname === '/record') {
    return (
      <BlueButton onClick={() => setRecordModalState(true)}>
        + 템플릿 추가
      </BlueButton>
    );
  } else {
    return null;
  }
}

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
  },
});
