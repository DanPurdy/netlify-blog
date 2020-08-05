import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { GlobalStyle } from '../theme';

interface ILayoutProps extends RouteComponentProps {
  title: string;
}

const Layout: FC<ILayoutProps> = ({ location, title, children }) => {
  return (
    <main>
      <GlobalStyle />
      {React.Children.map(children, (child, index) => (
        <PageWrap>
          {child}
        </PageWrap>
      ))}
      <Footer />
    </main>
  );
};

const PageWrap = styled.div`
  height: 100vh;
  max-width: 1440px;
  min-width: 320px;
  margin: 0 auto;
  padding: 80px;
`;

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`;

export default Layout;
