import * as React from 'react';
import { FC } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const PageHeader: FC<{ currentLocation?: string }> = ({ currentLocation }) => {
  const { personal, portrait } = useStaticQuery(graphql`
    query HeaderQuery {
      personal: allFile(filter: { name: { eq: "personal_details" } }) {
        edges {
          node {
            id
            name
            childMdx {
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
          gatsbyImageData(
            height: 100
            placeholder: NONE
            layout: CONSTRAINED
          )
        }
      }
    }
  `);

  const title = personal?.edges[0]?.node?.childMdx?.frontmatter?.title;
  const image = getImage(portrait.childImageSharp);

  const location = currentLocation?.toLowerCase();

  let subTitleElem;

  if (currentLocation && location === 'blog') {
    subTitleElem = (
      <h2 className="text-3xl text-neon-pink m-0 px-6 pr-0 pt-6 self-end flex-auto sm:text-4xl md:text-4xl xl:text-4xl xl:flex-initial xl:pl-4">
        <Link to="/blog" className="no-underline text-inherit">
          {currentLocation}
        </Link>
      </h2>
    );
  } else {
    subTitleElem = (
      <h2 className="text-3xl text-neon-pink m-0 px-2 pr-0 self-end flex-auto sm:text-4xl md:text-5xl xl:text-6xl xl:flex-initial xl:pl-4">
        {currentLocation}
      </h2>
    );
  }

  return (
    <header className="py-8 pb-4 flex justify-start items-center">
      <div className="flex-[1_1_10rem] max-w-[6rem] flex justify-start mr-4 md:max-w-[8rem] xl:max-w-[10rem]">
        <Link to="/" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px]">
          {image && (
            <GatsbyImage
              alt={title || 'Logo'}
              loading="eager"
              image={image}
              objectFit="contain"
              style={{ maxHeight: '100px', width: '100%', maxWidth: '100px' }}
            />
          )}
        </Link>
      </div>
      <div className="flex items-center pt-2 flex-1 flex-wrap justify-between basis-full sm:flex-nowrap sm:basis-auto lg:justify-start">
        <Link to="/">
          <h1 className="m-0 text-4xl md:text-5xl xl:text-6xl">{title}</h1>
        </Link>
        {subTitleElem}
      </div>
    </header>
  );
};

export default PageHeader;
