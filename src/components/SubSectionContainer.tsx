import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../theme';

const SubSection = styled.div`
  font-size: 1.8rem;
  margin: 0 0 2.5rem;

  @media (max-width: ${breakpoints.palm}) {
    flex: 1 1 50%;
    padding: 0 1rem 0 0;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    flex: 1 1 100%;
  }
`;

const SubSectionContainer: FC<{}> = ({ children }) => {
  return <SubSection>{children}</SubSection>;
};

export default SubSectionContainer;
