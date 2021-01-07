/// <reference path="../typings/content.d.ts" />

import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/SEO';

import ExperienceSection from '../components/ExperienceSection';
import HomeSection from '../components/HomeSection';

interface IndexProps extends RouteComponentProps {
  data: {
    experience: IExperienceType;
    personal: IPersonalType;
    posts: IPostType;
    projects: {};
    site: {
      siteMetadata: {
        author: string;
        title: string;
      };
    };
  };
}

const IndexPage: FC<IndexProps> = ({ data, location }) => {
  const {
    experience,
    personal,
    site: {
      siteMetadata: { author },
    },
  } = data;
  const {
    childMdx: {
      body,
      frontmatter: { title, subtitle },
    },
  } = personal.edges[0].node;

  return (
    <>
      <SEO
        title="Home"
        keywords={[
          `Dan Purdy`,
          `Portfolio`,
          `Fullstack Developer`,
          `Senior Fullstack Engineer`,
          `UK based developer`,
          `Lead Frontend Developer`,
          `Development blog`,
        ]}
      />
      <Layout title={title}>
        <HomeSection data={personal} />
        <ExperienceSection experience={experience} />
      </Layout>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        title
      }
    }
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
    experience: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/experience/.*.md$/" } }
    ) {
      edges {
        node {
          body
          frontmatter {
            startDate(formatString: "MMM YYYY")
            endDate(formatString: "MMM YYYY")
            id
            isCurrent
            logo {
              publicURL
            }
            title
            position
            previousPosition
            url
          }
        }
      }
    }
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/.*.md$/" } }
      limit: 2
    ) {
      edges {
        node {
          excerpt
          fields {
            readingTime {
              text
            }
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
