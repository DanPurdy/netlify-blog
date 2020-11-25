import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import FooterThin from './FooterThin';

import { breakpoints, GlobalStyle } from '../theme';

interface ILayoutProps extends RouteComponentProps {
  author: string;
}

const ThinLayout: FC<ILayoutProps> = ({ location, author, children }) => {
  return (
    <main>
      <GlobalStyle />
      <ThinLayoutWrap>
        {React.Children.map(children, (child, index) => child)}
      </ThinLayoutWrap>
      <FooterThin title={author} />
    </main>
  );
};

const ThinLayoutWrap = styled.div`
  max-width: 800px;
  min-width: 320px;
  min-height: 85vh;
  margin: 0 auto;
  padding: 0 4rem;

  @media (max-width: ${breakpoints.largeHand}) {
    padding: 0 2rem;
  }
`;

export default ThinLayout;
