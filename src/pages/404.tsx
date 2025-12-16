import * as React from 'react';
import { FC } from 'react';
import { graphql, PageProps } from 'gatsby';

import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader/PageHeader';

interface INotFoundPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        author: string;
      };
    };
  };
}

const NotFoundPage: FC<INotFoundPageProps> = ({ data, location }) => {
  const author = data?.site?.siteMetadata?.author;

  return (
    <ThinLayout location={location} author={author}>
      <>
        <PageHeader currentLocation="404" />
        <section className="flex flex-col items-center justify-center w-full text-center my-[15%]">
          <SEO title="404: Not Found" />
          <h1 className="m-4 md:text-6xl">Not Found</h1>
          <p className="text-xl">Sorry, can't find that page...</p>
        </section>
      </>
    </ThinLayout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        title
      }
    }
  }
`;
