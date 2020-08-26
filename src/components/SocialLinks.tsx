import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../theme';

import TwitterIcon from '../../content/assets/svg/twitter.svg';
import LinkedInIcon from '../../content/assets/svg/linked-in.svg';
import GithubIcon from '../../content/assets/svg/github.svg';
import CVIcon from '../../content/assets/svg/cv.svg';

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
  padding: 1rem;
  text-decoration: none;
`;

const SocialLinks: FC = () => {
  return (
    <Container>
      <Link
        href="https://github.com/danpurdy"
        aria-label="Find me on Github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </Link>
      <Link
        href="https://d2wgwec1ef3t7f.cloudfront.net/assets/Dan-Purdy-CV.pdf"
        aria-label="Download my CV"
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        <CVIcon />
      </Link>
      <Link
        href="https://twitter.com/danpurdy0"
        aria-label="Find me on Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </Link>
      <Link
        href="https://www.linkedin.com/in/dan-purdy-developer"
        aria-label="Find me on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </Link>
    </Container>
  );
};

export default SocialLinks;
