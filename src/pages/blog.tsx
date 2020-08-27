import React, { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import Button from '../components/button';
import { IExperienceNodeType } from '../types/content';
import PageHeader from '../components/PageHeader/PageHeader';
import styled from 'styled-components';

interface IBlogPageProps extends PageProps {
  data: {
    allMdx: {
      edges: {
        node: {
          excerpt: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            date: string;
            description: string;
            title: string;
          };
        };
      }[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const BlogPostBox = styled.div``;

const Blog: FC<IBlogPageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <PageLayout location={location} title={siteTitle}>
      <>
        <SEO title="All posts" />
        <PageHeader currentLocation="Blog" />
        <div style={{ margin: '20px 0 40px' }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <BlogPostBox key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: '8rem',
                  }}
                >
                  <Link
                    style={{ boxShadow: `none` }}
                    to={`/blog${node.fields.slug}`}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </BlogPostBox>
            );
          })}
        </div>
      </>
    </PageLayout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/.*.md$/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
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
