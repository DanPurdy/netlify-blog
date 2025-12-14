/// <reference path="../../typings/content.d.ts" />

import React, { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { breakpoints, colors } from '../../theme';

import FrontPageHeader from '../FrontPageHeader';
import SocialLinks from '../SocialLinks';

const SectionContainer = styled.section``;

const ContentSection = styled.div`
  padding: 0 2rem;

  @media (max-width: ${breakpoints.largeHand}) {
    padding: 0;
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
  flex: 1 1 33%;
  padding: 1rem 2rem 0;
  display: flex;
  justify-content: center;

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

const MainText = styled.div`
  flex: 2 2 66%;
  letter-spacing: -1px;
  font-size: 2.2rem;
  color: #ffffff;

  p {
    margin-top: 0;
  }
`;

const BodyText = styled.div`
  p {
    margin: 0 0 1.5rem;
    line-height: 1.6;
  }
`;

interface IExperienceProps {
  data: IPersonalType;
}

const HomeSection: FC<IExperienceProps> = ({ data }) => {
  const {
    childMdx: {
      excerpt,
      frontmatter: { title, subtitle },
    },
  } = data.edges[0].node;

  const imageData = useStaticQuery(graphql`
    query HomeImageQuery {
      portrait: file(absolutePath: { regex: "/me-portrait.png/" }) {
        childImageSharp {
          gatsbyImageData(
            height: 200
            placeholder: TRACED_SVG
            layout: CONSTRAINED
          )
        }
      }
    }
  `);

  const image = getImage(imageData.portrait.childImageSharp);

  return (
    <SectionContainer>
      <ContentSection>
        <FrontPageHeader subtitle={subtitle} title={title} />
        <IntroContent>
          <ImageContainer>
            {image && (
              <GatsbyImage
                alt={title}
                loading="eager"
                image={image}
                objectFit="contain"
                style={{ maxHeight: '200px', width: '100%', maxWidth: '200px' }}
              />
            )}
          </ImageContainer>
          <MainText>
            <BodyText>
              <p>{excerpt}</p>
            </BodyText>
            <SocialLinks />
          </MainText>
        </IntroContent>
      </ContentSection>
    </SectionContainer>
  );
};

export default HomeSection;
