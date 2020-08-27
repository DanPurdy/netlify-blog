import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { breakpoints, GlobalStyle } from '../theme';

interface ILayoutProps extends RouteComponentProps {
  title: string;
}

const PageLayout: FC<ILayoutProps> = ({ location, title, children }) => {
  return (
    <main>
      <GlobalStyle />
      <PageLayoutWrap>
        {React.Children.map(children, (child, index) => child)}
      </PageLayoutWrap>
      <Footer />
    </main>
  );
};

const PageLayoutWrap = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Footer = styled.footer`
  text-align: center;
  margin: 2.4rem 0;
`;

export default PageLayout;
