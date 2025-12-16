import * as React from 'react';
import { FC } from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader/PageHeader';

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

const Blog: FC<IBlogPageProps> = ({ data, location }) => {
  const author = data.site.siteMetadata.author;
  const posts = data.allMdx.edges;

  return (
    <ThinLayout location={location} author={author}>
      <>
        <SEO title="Blog" />
        <PageHeader currentLocation="Blog" />
        <section className="my-10 xl:mt-12 md:mt-8">
          {posts.length ? (
            posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <div
                  key={node.fields.slug}
                  className="m-0 mb-8 py-8 border-b border-faded-line xl:mr-0"
                >
                  <Link to={`/blog${node.fields.slug}`} className="no-underline">
                    <h3 className="my-4 text-3xl leading-tight md:text-3-5xl md:leading-tight">
                      {title}
                    </h3>
                  </Link>
                  <div className="my-8 mb-4 text-sm">
                    <span className="text-left text-neon-pink">
                      {node.frontmatter.date}
                    </span>
                    <span className="ml-8">{node.fields.readingTime}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No posts yet</h2>
          )}
        </section>
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
      filter: { internal: { contentFilePath: { regex: "/content/blog/" } } }
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
