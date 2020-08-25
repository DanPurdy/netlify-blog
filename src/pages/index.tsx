import React, { FC, ReactElement } from 'react';
import { RouteComponentProps } from '@reach/router';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/SEO';

import ExperienceSection from '../components/ExperienceSection';
import HomeSection from '../components/HomeSection';

import { IExperienceType, IPersonalType } from '../types/content';

interface IndexProps extends RouteComponentProps {
  data: {
    experience: IExperienceType;
    personal: IPersonalType;
    projects: {};
    site: {};
  };
}

const IndexPage: FC<IndexProps> = ({ data, location }) => {
  const siteTitle = 'Gatsby Starter Personal Website';

  const { experience, personal, projects, site } = data;

  return (
    <>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Layout location={location} title={siteTitle}>
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
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/projects/.*.md$/" } }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            company
          }
        }
      }
    }
  }
`;
