import React, { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import SEO from '../components/SEO';

interface IPostType {
  body: string;
  excerpt: string;
  fields: {
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

  return (
    <Layout location={location} title={siteTitle}>
      <>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            // ...scale(-1 / 5),
            display: `block`,
            // TODO remove rhythm
            // marginBottom: rhythm(1),
            // marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr
          style={
            {
              // TODO remove rhythm
              // marginBottom: rhythm(1),
            }
          }
        />

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
      </>
    </Layout>
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
    }
  }
`;
