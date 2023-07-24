import styled from '@emotion/styled';

import AppRouter from '@/Router';

function App() {
  return (
    <AppContainer>
      <AppRouter />
    </AppContainer>
  );
}
export default App;

const AppContainer = styled.div`
  width: 1440px;
  height: 100vh;
  margin: 0 auto;
`;
