import React, { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import Button from '../components/button';
import { IExperienceNodeType } from '../types/content';
import PageHeader from '../components/PageHeader/PageHeader';
import styled from 'styled-components';
import { colors, breakpoints } from '../theme';

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

const BlogContainer = styled.section<{ numItems: number }>`
  display: flex;
  flex-wrap: wrap;
  margin: 10rem 0;
  justify-content: ${({ numItems }) =>
    numItems > 2 ? 'center' : 'flex-start'};
`;

const BlogPostBox = styled.div`
  flex: 1 1 23%;
  max-width: 23%;
  min-width: 300px;
  margin: 0 2rem 2rem 0;
  border-radius: 4px;
  background-color: ${colors.blogPostBackground};

  @media (max-width: ${breakpoints.smallPalm}) {
    margin-right: 0;
    flex-basis: 100%;
    max-width: none;
  }

  a {
    display: block;
    padding: 2rem 3rem;
    text-decoration: none;
  }
`;

const BlogBoxTitle = styled.h3`
  margin: 2rem 0 1rem 0;
`;

const BlogBoxContent = styled.div`
  margin: 0 0 5rem 0;
  border-top: 1px solid ${colors.secondaryColor};
  padding-top: 3rem;
`;

const BlogPostDate = styled.div`
  text-align: right;
  font-size: 1.4rem;
  color: ${colors.secondaryColor};
`;

const Blog: FC<IBlogPageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <PageLayout location={location} title={siteTitle}>
      <>
        <SEO title="Blog" />
        <PageHeader currentLocation="Blog" />
        <BlogContainer numItems={posts.length}>
          {posts.length ? (
            posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <BlogPostBox key={node.fields.slug}>
                  <Link to={`/blog${node.fields.slug}`}>
                    <BlogBoxTitle>{title}</BlogBoxTitle>
                    <BlogBoxContent>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </BlogBoxContent>
                    <BlogPostDate>{node.frontmatter.date}</BlogPostDate>
                  </Link>
                </BlogPostBox>
              );
            })
          ) : (
            <h2>No posts yet</h2>
          )}
        </BlogContainer>
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
