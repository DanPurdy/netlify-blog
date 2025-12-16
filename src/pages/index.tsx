/// <reference path="../typings/content.d.ts" />

import * as React from 'react';
import { FC } from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/SEO';

import BlogSection from '../components/BlogSection';
import ExperienceSection from '../components/ExperienceSection';
import HomeSection from '../components/HomeSection';

interface IndexProps extends PageProps {
  data: {
    experience: IExperienceType;
    personal: IPersonalType;
    posts: IPostsType;
    site: {
      siteMetadata: {
        author: string;
        title: string;
      };
    };
  };
}

const IndexPage: FC<IndexProps> = ({ data }) => {
  const {
    experience,
    personal,
    posts,
  } = data;
  const {
    childMdx: {
      frontmatter: { title },
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
        <BlogSection posts={posts} />
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
      sort: { frontmatter: { startDate: DESC } }
      filter: {
        internal: { contentFilePath: { regex: "/content/experience/" } }
      }
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
      sort: { frontmatter: { date: DESC } }
      filter: {
        internal: { contentFilePath: { regex: "/content/blog/" } }
      }
      limit: 3
    ) {
      edges {
        node {
          excerpt
          fields {
            readingTime
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
