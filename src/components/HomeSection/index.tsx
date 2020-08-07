import React, { FC } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components';

import { IPersonalType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Image from "gatsby-image"
import { colors } from '../../theme';

const SectionContainer = styled.section`

`;

const ContentSection = styled.div`
  padding: 0 2rem;
`;

const FrontPageHeader = styled.header`
  margin: 3rem 0 10rem;
  text-align: center;

`;

const IntroContent = styled.div`
  display: flex;
  max-width:1000px;
  margin: 0 auto;
`

const ImageContainer = styled.div`
  flex: 1 0 33%;
  padding: 0 2rem;
`

const MainTitle = styled.h1`
  margin: 2rem 0 1rem;
  font-size: 11rem;
  font-family: sans-serif;
  letter-spacing: -8px;
`

const SubTitle = styled.h2`
  margin: 1rem 0;
  color: ${colors.underlineColor};

  //TEMP
  font-size: 5rem;
  font-family: sans-serif;
  letter-spacing: -2px;
`

interface IExperienceProps {
  data: IPersonalType;
}

const HomeSection: FC<IExperienceProps> = ({ data }) => {
  const {childMdx: {body, frontmatter: {title, subtitle}}} = data.edges[0].node;

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
  `)


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
            style={{maxHeight: '200px', 'min-width': '100%'}}
          />
          </ImageContainer>
          <div>
          <MDXRenderer>{body}</MDXRenderer>
          </div>
        </IntroContent>
      </ContentSection>
    </SectionContainer>
  );
};

export default HomeSection;
