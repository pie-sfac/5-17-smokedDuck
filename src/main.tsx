import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App.tsx';
import Fonts from '@/fonts.tsx';

import MainContextProvider from './store';

const theme = extendTheme({
  fonts: {
    heading: 'Pretendard',
    body: 'Pretendard',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainContextProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <App />
      </ChakraProvider>
    </MainContextProvider>
  </React.StrictMode>
);
