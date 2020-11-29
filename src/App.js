import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './globalStyle';
import Store from './globalState/store';
import SettingsGroup from './components/settingsGroup';
import Link from './components/Link';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Site = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledFooter = styled.footer`
  margin-top: 20px;
  background-color: #012340;
  color: #f2ebdc;
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  > *:not(:last-child) {
    margin-right: 20px;
  }
`;

const App = () => {
  return (
    <Store>
      <GlobalStyle />
      <Site>
        <StyledContainer>
          <h1>Iris clasification app</h1>
          <SettingsGroup />
        </StyledContainer>
        <StyledFooter>
          <Link href="https://github.com/rafalstrozyk">Rafał Stróżyk</Link>

          <Link href="https://github.com/rafalstrozyk">Git repository</Link>
        </StyledFooter>
      </Site>
    </Store>
  );
};

export default App;
