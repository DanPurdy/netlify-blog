import React, { FC } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { colors, fonts, breakpoints } from '../../theme';

const Header = styled.header`
  padding: 4rem 0 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ImageContainer = styled.div`
  flex: 1 1 10rem;
  max-width: 10rem;
  display: flex;
  justify-content: flex-start;
  margin-right: 2rem;

  @media (max-width: ${breakpoints.palm}) {
    max-width: 8rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    max-width: 6rem;
  }
`;

const LogoLink = styled(Link)`
  width: 100px;
  height: 100px;

  @media (max-width: ${breakpoints.palm}) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    width: 60px;
    height: 60px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  flex: 1;

  @media (max-width: ${breakpoints.smallPalm}) {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  > a {
    @media (max-width: ${breakpoints.mediumHand}) {
      flex-basis: 100%;
    }
  }
`;

const MainTitle = styled.h1`
  margin: 0;

  @media (max-width: ${breakpoints.palm}) {
    font-size: 5rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 4rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 4rem;
  color: ${colors.secondaryColor};
  margin: 0;
  padding: 0 0 0 2rem;
  align-self: flex-end;

  @media (max-width: ${breakpoints.palm}) {
    font-size: 3rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.mediumHand}) {
    flex-basis: auto;
    padding: 0 1rem 0 0;
    font-size: 2rem;
  }
`;

const MainNav = styled.nav`
  flex: 1;
  font-family: ${fonts.heading};
  font-size: 3rem;
  align-self: flex-end;
  margin: 0 0 0 2rem;
  text-align: right;
  padding: 0 1rem 0.5rem;

  @media (max-width: ${breakpoints.palm}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.smallPalm}) {
    flex-basis: 100%;
    text-align: left;
    margin: 0;
    font-size: 2rem;
    padding: 0;
  }

  @media (max-width: ${breakpoints.mediumHand}) {
    flex-basis: auto;
  }

  a {
    text-decoration: none;
    transition: color 0.1s ease-in, border-color 0.2s ease-in-out;
    border-bottom: 1px solid transparent;
    padding: 0;

    &:hover {
      border-color: ${colors.secondaryColor};
      color: ${colors.secondaryColor};
    }
  }
`;

const PageHeader: FC<{ currentLocation?: string }> = ({ currentLocation }) => {
  const { personal, portrait } = useStaticQuery(graphql`
    query HeaderQuery {
      personal: allFile(filter: { name: { eq: "personal_details" } }) {
        edges {
          node {
            id
            name
            childMdx {
              body
              frontmatter {
                title
                subtitle
              }
            }
          }
        }
      }
      portrait: file(absolutePath: { regex: "/me-portrait.png/" }) {
        childImageSharp {
          fluid(maxHeight: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  const title = personal?.edges[0]?.node?.childMdx?.frontmatter?.title;

  const location = currentLocation?.toLowerCase();

  let subTitleElem;

  if (currentLocation && location === 'blog') {
    subTitleElem = (
      <SubTitle>
        <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
          {currentLocation}
        </Link>
      </SubTitle>
    );
  } else {
    subTitleElem = <SubTitle>{currentLocation}</SubTitle>;
  }

  return (
    <Header>
      <ImageContainer>
        <LogoLink to="/">
          <Image
            alt={title}
            loading="eager"
            fluid={portrait.childImageSharp.fluid}
            imgStyle={{ objectFit: 'contain' }}
            style={{ maxHeight: '100px', width: '100%', maxWidth: '100px' }}
          />
        </LogoLink>
      </ImageContainer>
      <TitleContainer>
        <Link to="/">
          <MainTitle>{title}</MainTitle>
        </Link>
        {subTitleElem}
        {location !== 'blog' && (
          <MainNav>
            <Link to="/blog">Blog</Link>
          </MainNav>
        )}
      </TitleContainer>
    </Header>
  );
};

export default PageHeader;
