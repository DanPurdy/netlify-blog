import React, { FC } from 'react';
import styled from 'styled-components';
import { IExperienceNodeType } from '../../../types/content';

import SubSectionContainer from '../../SubSectionContainer';
import SubSectionTitle from '../../SubSectionTitle';

interface IExperienceSubSectionProps {
  node: IExperienceNodeType;
  sectionName: 'position' | 'previousPosition';
  title: string;
}

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ItemListItem = styled.li`
  padding: 0.2rem 0;
`;

const ExperienceSubSection: FC<IExperienceSubSectionProps> = ({
  node,
  sectionName,
  title,
}) => {
  return (
    <SubSectionContainer>
      <SubSectionTitle>{title}</SubSectionTitle>
      <ItemList>
        {node.frontmatter[sectionName].map(pos => (
          <ItemListItem key={`${node.frontmatter.id}-${pos.replace(' ', '-')}`}>
            {pos}
          </ItemListItem>
        ))}
      </ItemList>
    </SubSectionContainer>
  );
};

export default ExperienceSubSection;
