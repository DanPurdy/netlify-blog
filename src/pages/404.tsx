import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';

import ThinLayout from '../components/ThinLayout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader/PageHeader';
import { breakpoints } from '../theme';

interface INotFoundPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        author: string;
      };
    };
  };
}

const CenteredContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin: 15% 0;
`;

const PageText = styled.p`
  font-size: 2rem;
`;

const PageTitle = styled.h1`
  margin: 2rem;

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 4rem;
  }
`;

const NotFoundPage: FC<INotFoundPageProps> = ({ data, location }) => {
  const author = data?.site?.siteMetadata?.author;

  return (
    <ThinLayout location={location} author={author}>
      <>
        <PageHeader currentLocation="404" />
        <CenteredContainer>
          <SEO title="404: Not Found" />
          <PageTitle>Not Found</PageTitle>
          <PageText>Sorry, can't find that page...</PageText>
        </CenteredContainer>
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
