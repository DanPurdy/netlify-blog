/// <reference path="../typings/content.d.ts" />

import React, { FC, ReactNode } from 'react';
import { Link, graphql, PageProps, HeadFC } from 'gatsby';

import PageHeader from '../components/PageHeader/PageHeader';
import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { breakpoints, colors } from '../theme';

const PostContainer = styled.main`
  max-width: 960px;
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

  h2,
  h3,
  h4 {
    color: ${colors.blogSubHeading};
    line-height: 1.3;
    margin: 3.5rem 0;
  }

  h2 {
    @media (max-width: ${breakpoints.smallPalm}) {
      font-size: 3.5rem;
      margin: 2.5rem 0;
    }

    @media (max-width: ${breakpoints.largeHand}) {
      font-size: 3rem;
      line-height: 1.3;
    }
  }

  h3 {
    @media (max-width: ${breakpoints.smallPalm}) {
      font-size: 3rem;
    }

    @media (max-width: ${breakpoints.largeHand}) {
      font-size: 2.6rem;
      line-height: 1.2;
    }
  }

  h4 {
    margin: 1.5rem 0;
  }

  blockquote {
    font-size: 1.8rem;
    border-left: 4px solid ${colors.neonPink};
    padding: 3rem;
    margin: 2rem 1rem;
    background: ${colors.backgroundLight};
    border-radius: 4px;

    p {
      margin: 0;
    }
  }

  code {
    letter-spacing: normal;
    border-radius: 4px;
  }

  pre {
    font-size: 2rem;
    margin: 4rem 0 6rem;

    @media (max-width: ${breakpoints.smallPalm}) {
      font-size: 1.4rem;
      line-height: 1.6rem;
    }

    &.monokai {
      background: #000;
    }
  }

  ol,
  ul {
    margin: 1.5rem 0;
    font-size: 1.8rem;
    line-height: 1.8;

    li {
      &::marker {
        color: ${colors.pastelBlue};
      }
    }
  }

  a {
    color: ${colors.neonPink};
    font-weight: bold;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in-out;

    &:hover {
      border-bottom: 2px solid ${colors.neonPink};
    }
  }
`;

interface IBlogPostProps extends PageProps {
  data: {
    mdx: {
      id: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        description: string;
      };
      fields: {
        readingTime: string;
      };
    };
    site: {
      siteMetadata: {
        author: string;
        title: string;
      };
    };
  };
  pageContext: {
    previous: { fields: { slug: string }; frontmatter: { title: string } } | null;
    next: { fields: { slug: string }; frontmatter: { title: string } } | null;
  };
  children: ReactNode;
}

const BlogPostTemplate: FC<IBlogPostProps> = ({
  data,
  location,
  pageContext,
  children,
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
                <PostReadTime>{post.fields.readingTime}</PostReadTime>
              </PostMeta>
            </PostHeader>
            <PostBody>{children}</PostBody>
            <hr />
          </Post>
        </PostContainer>
      </>
    </ThinLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        readingTime
      }
    }
  }
`;
