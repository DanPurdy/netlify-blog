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
            readingTime: string;
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
        author: string;
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
  padding: 2rem 0;
  border-bottom: 1px solid ${colors.fadedLine};

  @media (max-width: ${breakpoints.palm}) {
    margin-right: 0;
  }
`;

const BlogLink = styled(props => <Link {...props} />)`
  text-decoration: none;
`;

const BlogBoxHeading = styled.h3`
  margin: 2rem 0 2rem 0;
  font-size: 3.5rem;
  line-height: 5rem;

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 3rem;
    line-height: 4rem;
  }
`;

const BlogBoxContent = styled.div`
  margin: 0 0 5rem 0;
  padding-top: 0.5rem;
  font-size: 1.8rem;
`;

const BlogPostMeta = styled.div`
  margin: 2rem 0 1rem;
  font-size: 1.4rem;
`;

const BlogPostDate = styled.span`
  text-align: left;
  color: ${colors.secondaryColor};
`;

const BlogPostReadTime = styled.span`
  margin-left: 2rem;
`;

const Blog: FC<IBlogPageProps> = ({ data, location }) => {
  const author = data.site.siteMetadata.author;
  const posts = data.allMdx.edges;

  return (
    <ThinLayout location={location} author={author}>
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
                    <BlogBoxHeading>{title}</BlogBoxHeading>
                  </BlogLink>
                  <BlogPostMeta>
                    <BlogPostDate>{node.frontmatter.date}</BlogPostDate>
                    <BlogPostReadTime>
                      {node.fields.readingTime}
                    </BlogPostReadTime>
                  </BlogPostMeta>
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
        author
        title
      }
    }
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { internal: { contentFilePath: { regex: "/blog/.*.md$/" } } }
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
