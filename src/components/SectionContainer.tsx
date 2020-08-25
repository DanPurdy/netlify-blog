import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../theme';

const MainSectionContainer = styled.section`
  @media (max-width: ${breakpoints.wide}) {
    padding: 0 2rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    padding: 0;
  }
`;

const SectionContainer: FC = ({ children }) => (
  <MainSectionContainer>{children}</MainSectionContainer>
);

export default SectionContainer;
