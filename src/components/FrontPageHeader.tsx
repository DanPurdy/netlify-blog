import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../theme';

const FrontPageHeaderContainer = styled.header`
  margin: 3rem 0 10rem;
  text-align: center;

  @media (max-width: ${breakpoints.palm}) {
    margin-bottom: 4rem;
  }

  @media (max-width: ${breakpoints.smallPalm}) {
    margin-bottom: 5rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    margin-top: 1rem;
  }
`;

const MainTitle = styled.h1`
  margin: 2rem 0 1rem;
  font-size: 11rem;
  letter-spacing: -8px;

  @media (max-width: ${breakpoints.smallPalm}) {
    font-size: 9.5rem;
    letter-spacing: -7px;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 7.5rem;
  }

  @media (max-width: ${breakpoints.mediumHand}) {
    font-size: 6rem;
    letter-spacing: -5px;
  }
`;

const SubTitle = styled.h2`
  margin: 1rem 0;
  color: ${colors.secondaryColor};
  font-size: 5rem;
  letter-spacing: -2px;

  @media (max-width: ${breakpoints.smallPalm}) {
    font-size: 4.5rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 4rem;
  }
`;

interface FrontPageHeaderProps {
  subtitle: string;
  title: string;
}

const FrontPageHeader: FC<FrontPageHeaderProps> = ({ subtitle, title }) => {
  return (
    <FrontPageHeaderContainer>
      <MainTitle>{title}</MainTitle>
      <SubTitle>{subtitle}</SubTitle>
    </FrontPageHeaderContainer>
  );
};

export default FrontPageHeader;
