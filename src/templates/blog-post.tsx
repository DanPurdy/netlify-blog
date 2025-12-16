/// <reference path="../typings/content.d.ts" />

import * as React from 'react';
import { FC, ReactNode } from 'react';
import { graphql, PageProps } from 'gatsby';

import PageHeader from '../components/PageHeader/PageHeader';
import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';

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
  children,
}) => {
  const post = data.mdx;
  const author = data?.site?.siteMetadata?.author;

  return (
    <ThinLayout location={location} author={author}>
      <>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <PageHeader currentLocation="Blog" />
        <main className="max-w-content-medium">
          <article className="mb-24">
            <header className="mb-22 border-b border-faded-line pb-4">
              <h1 className="text-3-5xl pb-2 mb-0 mt-16 leading-tight md:text-4-5xl md:leading-snug lg:text-5-5xl">
                {post.frontmatter.title}
              </h1>
              <div className="my-8 mb-4 text-base block">
                <span className="text-neon-pink">{post.frontmatter.date}</span>
                <span className="ml-8">{post.fields.readingTime}</span>
              </div>
            </header>
            <section className="blog-content text-white leading-relaxed">
              {children}
            </section>
            <hr className="border-faded-line" />
          </article>
        </main>
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
