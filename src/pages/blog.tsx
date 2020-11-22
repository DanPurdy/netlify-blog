import React, { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
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
  margin: 5rem 0;

  @media (max-width: ${breakpoints.palm}) {
    margin-top: 6rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    margin-top: 4rem;
  }
`;

const BlogPostBox = styled.div`
  margin: 0 0 2rem;
  padding: 2rem;
  border-bottom: 1px solid ${colors.fadedLine};

  @media (max-width: ${breakpoints.palm}) {
    margin-right: 0;
  }
`;

const BlogLink = styled(props => <Link {...props} />)`
  text-decoration: none;
`;

const BlogBoxTitle = styled.h3`
  margin: 2rem 0 2rem 0;
  font-size: 3.5rem;
  line-height: 5rem;
`;

const BlogBoxContent = styled.div`
  margin: 0 0 5rem 0;
  padding-top: 0.5rem;
  font-size: 1.8rem;
`;

const BlogPostDate = styled.div`
  text-align: left;
  font-size: 1.4rem;
  color: ${colors.secondaryColor};
`;

const Blog: FC<IBlogPageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <ThinLayout location={location} title={siteTitle}>
      <>
        <SEO title="Blog" />
        <PageHeader currentLocation="Blog" />
        <BlogContainer numItems={posts.length}>
          {posts.length ? (
            posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <BlogPostBox key={node.fields.slug}>
                  <BlogLink to={`/blog${node.fields.slug}`}>
                    <BlogBoxTitle>{title}</BlogBoxTitle>
                  </BlogLink>
                  <BlogPostDate>{node.frontmatter.date}</BlogPostDate>
                  <BlogBoxContent>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </BlogBoxContent>
                </BlogPostBox>
              );
            })
          ) : (
            <h2>No posts yet</h2>
          )}
        </BlogContainer>
      </>
    </ThinLayout>
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
