import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Fonts from 'fonts.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const theme = extendTheme({
  fonts: {
    heading: 'Pretendard',
    body: 'Pretendard',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
