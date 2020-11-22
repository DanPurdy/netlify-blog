import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { breakpoints, GlobalStyle } from '../theme';

interface ILayoutProps extends RouteComponentProps {
  title: string;
}

const ThinLayout: FC<ILayoutProps> = ({ location, title, children }) => {
  return (
    <main>
      <GlobalStyle />
      <ThinLayoutWrap>
        {React.Children.map(children, (child, index) => child)}
      </ThinLayoutWrap>
      <Footer />
    </main>
  );
};

const ThinLayoutWrap = styled.div`
  max-width: 800px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 4rem;

  @media (max-width: ${breakpoints.largeHand}) {
    padding: 0 2rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin: 2.4rem 0;
`;

export default ThinLayout;
