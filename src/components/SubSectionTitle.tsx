import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../theme';

const SectionTitle = styled.h4`
  margin: 0 0 0.7rem;
  opacity: 0.7;
  font-size: 1.8rem;

  @media (max-width: ${breakpoints.palm}) {
    font-size: 1.5rem;
  }
`;

const SubSectionTitle: FC<{}> = ({ children }) => {
  return <SectionTitle>{children}</SectionTitle>;
};

export default SubSectionTitle;
