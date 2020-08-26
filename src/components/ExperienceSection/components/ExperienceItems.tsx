import React, { FC } from 'react';
import { IExperienceType } from '../../../types/content';
import ExperienceItem from './ExperienceItem';
import styled from 'styled-components';

interface IExperienceItemProps {
  experience: IExperienceType;
}

const ExperienceItemsContainer = styled.div`
  margin: 10rem 0 6rem;
`;

const ExperienceItems: FC<IExperienceItemProps> = ({ experience }) => {
  return (
    <ExperienceItemsContainer>
      {experience.edges.map(({ node }) => (
        <ExperienceItem key={node.frontmatter.id} node={node} />
      ))}
    </ExperienceItemsContainer>
  );
};

export default ExperienceItems;
