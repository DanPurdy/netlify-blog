import React, { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import PageHeader from '../components/PageHeader/PageHeader';
import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { colors } from '../theme';

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
  padding-bottom: 2rem;
`;

const PostHeading = styled.h1`
  font-size: 5.5rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
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

  p {
    margin: 0 0 3rem;
  }

  code: {
    letter-spacing: normal;
  }
  pre {
    font-size: 2rem;
    margin: 3rem 0;

    &.monokai {
      background: #000;
    }
  }
`;

interface IPostType {
  body: string;
  excerpt: string;
  fields: {
    readingTime: {
      text: string;
    };
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
}

interface IBlogPostProps extends PageProps {
  data: {
    mdx: IPostType;
    site: {
      siteMetadata: {
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
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  console.log(post, data, pageContext);

  return (
    <ThinLayout location={location} title={siteTitle}>
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
