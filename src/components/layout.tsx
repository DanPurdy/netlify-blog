import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { breakpoints, GlobalStyle } from '../theme';
import Footer from './Footer';

interface ILayoutProps extends RouteComponentProps {
  title: string;
}

const Layout: FC<ILayoutProps> = ({ title, children }) => {
  return (
    <React.Fragment>
      <main>
        <GlobalStyle />
        {React.Children.map(children, child => (
          <PageWrap>{child}</PageWrap>
        ))}
      </main>
      <Footer title={title} />
    </React.Fragment>
  );
};

const PageWrap = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  min-width: 320px;
  margin: 0 auto;
  padding: 8rem;

  @media (max-width: ${breakpoints.wide}) {
    padding: 2rem 2rem 8rem;
  }
`;

export default Layout;
