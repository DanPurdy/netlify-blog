/// <reference path="../../typings/content.d.ts" />

import * as React from 'react';
import { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Markdown from 'react-markdown';

import FrontPageHeader from '../FrontPageHeader';
import SocialLinks from '../SocialLinks';

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
    <section className="min-h-screen flex flex-col justify-center">
      <div className="px-0 md:px-4">
        <FrontPageHeader subtitle={subtitle} title={title} />
        <div className="flex flex-col text-center max-w-content-lg mx-auto xl:flex-row xl:text-left">
          <div className="flex-[1_1_33%] pt-0 px-8 flex justify-center mb-20 xl:mb-16 lg:mb-10 2xl:pt-4 2xl:mb-0">
            {image && (
              <GatsbyImage
                alt={title}
                loading="eager"
                image={image}
                objectFit="contain"
                style={{ maxHeight: '200px', width: '100%', maxWidth: '200px' }}
              />
            )}
          </div>
          <div className="flex-[2_2_66%] tracking-tight text-intro text-white [&>p]:mt-0 [&>p]:mb-8 [&>p]:leading-relaxed [&>p:last-child]:mb-0" style={{ letterSpacing: '-1px' }}>
            <Markdown>{body}</Markdown>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
