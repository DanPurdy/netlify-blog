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

const ExperienceItems = styled.div`
  margin: 6rem 0;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemLogoContainer = styled.div`
  width: 100%;
`;

const ItemLogo = styled.img`
  width: 100%;
  max-width: 300px;
`;

const InfoSection = styled.div`
  flex: 1 1 30%;
  padding-top: 2rem;
  margin-top: 5rem;
`;

const ItemTitle = styled.h3`
  font-size: 3rem;
  margin: 0 0 2rem;
  text-transform: uppercase;
`;

const MainText = styled.div`
  flex: 3 3 70%;
  font-size: 1.7rem;
  line-height: 2.6rem;
  margin-top: 5rem;
  color: #ffffff;
`;

const Status = styled.div``;

const SubSection = styled.div`
  margin-top: 2rem;
  font-size: 1.6rem;
`;

const SubSectionTitle = styled.h4`
  font-size: 1.6rem;
  margin: 0;
  opacity: 0.7;
  font-size: 1.4rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ItemListItem = styled.li`
  padding: 0.2rem 0;
`;

const ExperienceSection: FC<IExperienceProps> = ({ experience }) => {
  return (
    <ExperienceContainer>
      <ExperienceSectionHeader>
        <ExperienceSectionTitle>Work</ExperienceSectionTitle>
        <ExperienceSectionLine />
      </ExperienceSectionHeader>

      <ExperienceItems>
        {experience.edges.map(({ node }) => (
          <Item key={node.frontmatter.id}>
            <ItemLogoContainer>
              <ItemLogo
                src={node.frontmatter.logo.publicURL}
                alt={`${node.frontmatter.title} logo`}
              ></ItemLogo>
            </ItemLogoContainer>
            <InfoSection>
              <ItemTitle>
                <a
                  href={node.frontmatter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {node.frontmatter.title}
                </a>
              </ItemTitle>
              <SubSection>
                <SubSectionTitle>Employed</SubSectionTitle>
                {node.frontmatter.startDate} -{' '}
                {node.frontmatter.isCurrent ? 'Now' : node.frontmatter.endDate}
              </SubSection>
              <SubSection>
                <SubSectionTitle>Position</SubSectionTitle>
                <ItemList>
                  {node.frontmatter.position.map(pos => (
                    <ItemListItem
                      key={`${node.frontmatter.id}-${pos.replace(' ', '-')}`}
                    >
                      {pos}
                    </ItemListItem>
                  ))}
                </ItemList>
              </SubSection>
              {node.frontmatter.previousPosition.length ? (
                <SubSection>
                  <SubSectionTitle>Previous Positions</SubSectionTitle>
                  <ItemList>
                    {node.frontmatter.previousPosition.map(pos => (
                      <ItemListItem
                        key={`${node.frontmatter.id}-${pos.replace(' ', '-')}`}
                      >
                        {pos}
                      </ItemListItem>
                    ))}
                  </ItemList>
                </SubSection>
              ) : null}
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
