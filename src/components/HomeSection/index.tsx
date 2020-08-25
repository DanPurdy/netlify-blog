import React, { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { IPersonalType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Image from 'gatsby-image';
import { breakpoints, colors } from '../../theme';

import SocialLinks from '../SocialLinks';

const SectionContainer = styled.section``;

const ContentSection = styled.div`
  padding: 0 2rem;

  @media (max-width: ${breakpoints.largeHand}) {
    padding: 0;
  }
`;

const FrontPageHeader = styled.header`
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

const IntroContent = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.palm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  flex: 1 0 33%;
  padding: 1rem 2rem 0;

  @media (max-width: ${breakpoints.palm}) {
    padding-top: 0;
    margin-bottom: 4rem;
  }

  @media (max-width: ${breakpoints.smallPalm}) {
    margin-bottom: 5rem;
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
  color: ${colors.underlineColor};
  font-size: 5rem;
  letter-spacing: -2px;

  @media (max-width: ${breakpoints.smallPalm}) {
    font-size: 4.5rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 4rem;
  }
`;

const MainText = styled.div`
  letter-spacing: -1px;
  font-size: 2.2rem;
  color: #ffffff;

  p {
    margin-top: 0;
  }
`;

interface IExperienceProps {
  data: IPersonalType;
}

const HomeSection: FC<IExperienceProps> = ({ data }) => {
  const {
    childMdx: {
      body,
      frontmatter: { title, subtitle },
    },
  } = data.edges[0].node;

  const imageData = useStaticQuery(graphql`
    query HomeImageQuery {
      portrait: file(absolutePath: { regex: "/me-portrait.png/" }) {
        childImageSharp {
          fluid(maxHeight: 478) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <SectionContainer>
      <ContentSection>
        <FrontPageHeader>
          <MainTitle>{title}</MainTitle>
          <SubTitle>{subtitle}</SubTitle>
        </FrontPageHeader>
        <IntroContent>
          <ImageContainer>
            <Image
              alt={title}
              fluid={imageData.portrait.childImageSharp.fluid}
              imgStyle={{ objectFit: 'contain' }}
              style={{ maxHeight: '200px', minWidth: '100%' }}
            />
          </ImageContainer>
          <MainText>
            <MDXRenderer>{body}</MDXRenderer>
            <SocialLinks />
          </MainText>
        </IntroContent>
      </ContentSection>
    </SectionContainer>
  );
};

export default HomeSection;
