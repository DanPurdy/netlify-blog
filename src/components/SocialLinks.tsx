import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../theme';

import TwitterIcon from '../../content/assets/svg/twitter.svg';
import LinkedInIcon from '../../content/assets/svg/linked-in.svg';
import GithubIcon from '../../content/assets/svg/github.svg';

const Container = styled.section`
  display: flex;
  justify-content: flex-start;
  margin: 6rem 0 4rem;

  @media (max-width: ${breakpoints.palm}) {
    justify-content: center;
  }
`;

const Link = styled.a`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: 2px solid ${colors.underlineColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

const SocialLinks: FC = () => {
  return (
    <Container>
      <Link href="https://github.com/danpurdy" aria-label="Find me on Github">
        <GithubIcon />
      </Link>
      <Link
        href="https://twitter.com/danpurdy0"
        aria-label="Find me on Twitter"
      >
        <TwitterIcon />
      </Link>
      <Link
        href="https://www.linkedin.com/in/dan-purdy-developer"
        aria-label="Find me on LinkedIn"
      >
        <LinkedInIcon />
      </Link>
    </Container>
  );
};

export default SocialLinks;
