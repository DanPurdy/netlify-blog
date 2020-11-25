import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { breakpoints, colors } from '../theme';

const FooterContainer = styled.div`
  max-width: 1440px;
  min-width: 320px;
  margin: 0 auto;
  padding: 3rem 8rem 5rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.wide}) {
    padding: 2rem 4rem 4rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    padding: 2rem;
    display: block;
  }
`;

const FooterLinks = styled.ul`
  margin: 0 0 0 1rem;
  padding: 0;
  list-style: none;
  display: flex;

  @media (max-width: ${breakpoints.largeHand}) {
    margin: 0;
    padding: 2rem 0;
  }
`;

const FooterElement = styled.li``;

const FooterTitle = styled.h3`
  font-size: 3.5rem;
  line-height: 1;
  margin: 0;
  letter-spacing: -2.5px;
`;

const anchorStyles = css`
  font-size: 1.6rem;
  margin-left: 1.8rem;
  text-decoration: none;
  border-bottom: 1px solid ${colors.portfolioBackground};
  color: ${colors.secondaryColor};
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;

  &:hover {
    border-bottom: 1px solid ${colors.secondaryColor};
    color: ${colors.primaryFontColor};
    opacity: 0.9;
  }
`;

const FooterTitleLink = styled(props => <Link {...props} />)`
  text-decoration: none;
`;

const FooterAnchor = styled.a`
  ${anchorStyles}
`;

const FooterLinkAnchor = styled(props => <Link {...props} />)`
  ${anchorStyles}

  &:first-of-type {
    @media (max-width: ${breakpoints.largeHand}) {
      margin-left: 0;
    }
  }
`;

interface FooterProps {
  title: string;
}

const Footer: FC<FooterProps> = ({ title }) => {
  return (
    <FooterContainer>
      <FooterTitleLink to="/">
        <FooterTitle>{title}</FooterTitle>
      </FooterTitleLink>
      <FooterLinks>
        <FooterElement>
          <FooterLinkAnchor to="/blog">Blog</FooterLinkAnchor>
        </FooterElement>
        <FooterElement>
          <FooterAnchor
            href="https://twitter.com/danpurdy0"
            aria-label="Find me on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </FooterAnchor>
        </FooterElement>
        <FooterElement>
          <FooterAnchor
            href="https://github.com/danpurdy"
            aria-label="Find me on Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </FooterAnchor>
        </FooterElement>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
