import React, { FC } from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { colors, breakpoints } from '../../../theme';
import ExperienceDateSection from './ExperienceDateSection';
import ExperienceSubSection from './ExperienceSubsection';
import ExperienceItemLogo from './ExperienceItemLogo';

interface IExperienceItem {
  node: IExperienceNodeType;
}

const ItemContent = styled.div`
  display: flex;

  @media (max-width: ${breakpoints.palm}) {
    flex-direction: column;
  }
`;

const InfoSection = styled.div`
  flex: 1 1 30%;

  @media (max-width: ${breakpoints.palm}) {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    border-bottom: 1px solid ${colors.white};
    margin-bottom: 4rem;
  }
`;

const MainText = styled.div`
  flex: 3 3 70%;
  font-size: 1.9rem;
  line-height: 2.6rem;
  color: ${colors.white};

  p {
    margin: 0 0 2.5rem;
  }

  @media (max-width: ${breakpoints.largeHand}) {
    font-size: 1.7rem;
  }
`;

const ExprienceItem: FC<IExperienceItem> = ({ node }) => {
  return (
    <>
      <ExperienceItemLogo
        altText={node.frontmatter.title}
        publicURL={node.frontmatter.logo.publicURL}
        url={node.frontmatter.url}
      />
      <ItemContent>
        <InfoSection>
          <ExperienceDateSection
            endDate={node.frontmatter.endDate}
            isCurrent={node.frontmatter.isCurrent}
            startDate={node.frontmatter.startDate}
            title="Employed"
          />
          <ExperienceSubSection
            node={node}
            sectionName="position"
            title="Position"
          />
          {(node.frontmatter.previousPosition && node.frontmatter.previousPosition.length) ? (
            <ExperienceSubSection
              node={node}
              sectionName="previousPosition"
              title="Previous Positions"
            />
          ) : null}
        </InfoSection>
        <MainText>
          <MDXRenderer>{node.body}</MDXRenderer>
        </MainText>
      </ItemContent>
    </>
  );
};

export default ExprienceItem;
