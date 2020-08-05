import React, { FC } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components';

import { IPersonalType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Image from "gatsby-image"

const SectionContainer = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MainImageContainer = styled.div`
  flex: 1 0 25%;
  padding: 0 2rem;
`;

const ContentSection = styled.div`
  flex: 1 0 75%;
  padding: 0 2rem;
`;

interface IExperienceProps {
  data: IPersonalType;
}

const HomeSection: FC<IExperienceProps> = ({ data }) => {
  const {childMdx: {body, frontmatter: {title, subtitle}}} = data.edges[0].node;

  const imageData = useStaticQuery(graphql`
    query HomeImageQuery {
      pixelDan: file(absolutePath: { regex: "/me_pixel_no_bg.png/" }) {
        childImageSharp {
          fluid(maxHeight: 792) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <SectionContainer>
      <MainImageContainer>
        <Image
          alt={title}
          fluid={imageData.pixelDan.childImageSharp.fluid}
          imgStyle={{ objectFit: 'contain' }}
          style={{maxHeight: '600px'}}
        />
      </MainImageContainer>
      <ContentSection>
        <header>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </header>
        <div><MDXRenderer>{body}</MDXRenderer></div>
      </ContentSection>
    </SectionContainer>
  );
};

export default HomeSection;
