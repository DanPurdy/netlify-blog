import React, { FC } from 'react';
import styled from 'styled-components';
import { IExperienceType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { colors, breakpoints } from '../../theme';

interface IExperienceProps {
  experience: IExperienceType;
}

const ExperienceContainer = styled.section`
  @media (max-width: ${breakpoints.wide}) {
    padding: 0 2rem;
  }

  @media (max-width: ${breakpoints.palm}) {
    text-align: center;
  }
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

const Item = styled.div``;

const ItemContent = styled.div`
  display: flex;

  @media (max-width: ${breakpoints.palm}) {
    flex-direction: column;
  }
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

  @media (max-width: ${breakpoints.palm}) {
    display: flex;
    flex-direction: row;
    margin-top: 3rem;
  }
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
  color: ${colors.white};
`;

const Status = styled.div``;

const SubSection = styled.div`
  margin-top: 2rem;
  font-size: 1.6rem;

  @media (max-width: ${breakpoints.palm}) {
    flex: 1 1 33%;

    &:nth-of-type(2) {
      border-left: 1px solid ${colors.white};
      border-right: 1px solid ${colors.white};
    }
  }
`;

const SubSectionTitle = styled.h4`
  margin: 0;
  opacity: 0.7;
  font-size: 1.4rem;

  @media (max-width: ${breakpoints.palm}) {
    font-size: 1.9rem;
    margin-bottom: 2rem;
  }
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
              <a
                href={node.frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ItemLogo
                  src={node.frontmatter.logo.publicURL}
                  alt={`${node.frontmatter.title} logo`}
                ></ItemLogo>
              </a>
            </ItemLogoContainer>
            <ItemContent>
              <InfoSection>
                <SubSection>
                  <SubSectionTitle>Employed</SubSectionTitle>
                  {node.frontmatter.startDate} -{' '}
                  {node.frontmatter.isCurrent
                    ? 'Now'
                    : node.frontmatter.endDate}
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
                          key={`${node.frontmatter.id}-${pos.replace(
                            ' ',
                            '-'
                          )}`}
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
            </ItemContent>
          </Item>
        ))}
      </ExperienceItems>
    </ExperienceContainer>
  );
};

export default ExperienceSection;
