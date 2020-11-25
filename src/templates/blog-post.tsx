/// <reference path="../typings/content.d.ts" />

import React, { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import PageHeader from '../components/PageHeader/PageHeader';
import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { breakpoints, colors } from '../theme';

const PostContainer = styled.main`
  max-width: 960px;
  /* margin: 0 auto; */
`;

const Post = styled.article`
  margin-bottom: 12rem;
`;

const PostHeader = styled.header`
  margin-bottom: 5rem;
  border-bottom: 1px solid ${colors.fadedLine};
  padding-bottom: 2rem 0;
`;

const PostHeading = styled.h1`
  font-size: 5.5rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
  line-height: 1.4;

  @media (max-width: ${breakpoints.smallPalm}) {
    font-size: 4.5rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 3.5rem;
    line-height: 1.3;
  }
`;

const PostMeta = styled.div`
  margin: 2rem 0 1rem;
  font-size: 1.6rem;
`;

const PostDate = styled.span`
  color: ${colors.secondaryColor};
`;
const PostReadTime = styled.span`
  margin-left: 2rem;
`;

const PostBody = styled.section`
  letter-spacing: -0.3px;
  font-size: 2rem;
  line-height: 3.3rem;
  color: #ffffff;

  @media (max-width: ${breakpoints.smallPalm}) {
    font-size: 1.7rem;
    line-height: 2.8rem;
  }

  p {
    margin: 0 0 3rem;
  }

  code: {
    letter-spacing: normal;
  }

  pre {
    font-size: 2rem;
    margin: 3rem 0;

    @media (max-width: ${breakpoints.smallPalm}) {
      font-size: 1.4rem;
      line-height: 1.6rem;
    }

    &.monokai {
      background: #000;
    }
  }
`;

interface IBlogPostProps extends PageProps {
  data: {
    mdx: IPostType;
    site: {
      siteMetadata: {
        author: string;
        title: string;
      };
    };
  };
  pageContext: {
    previous: IPostType;
    next: IPostType;
  };
}

const BlogPostTemplate: FC<IBlogPostProps> = ({
  data,
  location,
  pageContext,
}) => {
  const post = data.mdx;
  const author = data?.site?.siteMetadata?.author;
  const { previous, next } = pageContext;

  return (
    <ThinLayout location={location} author={author}>
      <>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <PageHeader currentLocation="Blog" />
        <PostContainer>
          <Post>
            <PostHeader>
              <PostHeading>{post.frontmatter.title}</PostHeading>
              <PostMeta
                style={{
                  display: `block`,
                }}
              >
                <PostDate>{post.frontmatter.date}</PostDate>
                <PostReadTime>{post.fields.readingTime.text}</PostReadTime>
              </PostMeta>
            </PostHeader>
            <PostBody>
              <MDXRenderer>{post.body}</MDXRenderer>
            </PostBody>
            <hr />

            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={`blog${previous.fields.slug}`} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={`blog${next.fields.slug}`} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </Post>
        </PostContainer>
      </>
    </ThinLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
