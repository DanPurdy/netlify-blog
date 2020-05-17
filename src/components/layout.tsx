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
    <Wrapper>
      <GlobalStyle />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  min-width: 320px;
`;

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`;

export default Layout;
