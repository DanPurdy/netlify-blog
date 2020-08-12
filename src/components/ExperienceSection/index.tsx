import React, { FC } from 'react';
import styled from 'styled-components';
import { IExperienceType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { colors } from '../../theme';

interface IExperienceProps {
  experience: IExperienceType;
}

const ExperienceContainer = styled.section`
  /* display: flex; */
`;

const ExperienceSectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ExperienceSectionTitle = styled.h2`
  font-size: 4rem;
  line-height: 1;
  color: ${colors.underlineColor};
  margin: 0 2rem 0 0;
`;

const ExperienceSectionLine = styled.div`
  flex: 1 1 auto;
  height: 3px;
  border-bottom: 3px solid ${colors.underlineColor};
  margin-bottom: 0.4rem;
`;

const ExperienceItems = styled.div``;

const Item = styled.div`
  display: flex;
`;

const InfoSection = styled.div`
  flex: 1 1 30%;
`;

const ItemTitle = styled.h3`
  font-size: 5rem;
`;

const MainText = styled.div`
  flex: 3 3 70%;
  font-size: 1.7rem;
  line-height: 2.6rem;
  margin-top: 3rem;
  color: #ffffff;
`;

const Status = styled.div``;

const SubSectionTitle = styled.h4`
  font-size: 1.6rem;
`;

const ExperienceSection: FC<IExperienceProps> = ({ experience }) => {
  return (
    <ExperienceContainer>
      <ExperienceSectionHeader>
        <ExperienceSectionTitle>Experience</ExperienceSectionTitle>
        <ExperienceSectionLine />
      </ExperienceSectionHeader>

      <ExperienceItems>
        {experience.edges.map(({ node }) => (
          <Item>
            <InfoSection>
              <ItemTitle>{node.frontmatter.title}</ItemTitle>
              <SubSectionTitle>Employed</SubSectionTitle>
              {node.frontmatter.startDate} -{' '}
              {node.frontmatter.isCurrent ? 'Now' : node.frontmatter.endDate}
              <SubSectionTitle>Current Position</SubSectionTitle>
              <ul>
                {node.frontmatter.position.map(pos => (
                  <li>{pos}</li>
                ))}
              </ul>
              <SubSectionTitle>Previous Positions</SubSectionTitle>
              <ul>
                {node.frontmatter.previousPosition.map(pos => (
                  <li>{pos}</li>
                ))}
              </ul>
            </InfoSection>
            <MainText>
              <MDXRenderer>{node.body}</MDXRenderer>
            </MainText>
          </Item>
        ))}
      </ExperienceItems>
    </ExperienceContainer>
  );
};

export default ExperienceSection;
