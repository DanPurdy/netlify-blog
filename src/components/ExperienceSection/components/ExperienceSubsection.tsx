import * as React from 'react';
import { FC } from 'react';

import SubSectionContainer from '../../SubSectionContainer';
import SubSectionTitle from '../../SubSectionTitle';

interface IExperienceSubSectionProps {
  node: IExperienceNodeType;
  sectionName: 'position' | 'previousPosition';
  title: string;
}

const ExperienceSubSection: FC<IExperienceSubSectionProps> = ({
  node,
  sectionName,
  title,
}) => {
  return (
    <SubSectionContainer>
      <SubSectionTitle>{title}</SubSectionTitle>
      <ul className="list-none p-0 m-0">
        {node.frontmatter[sectionName].map(pos => (
          <li
            key={`${node.frontmatter.id}-${pos.replace(' ', '-')}`}
            className="py-0.5"
          >
            {pos}
          </li>
        ))}
      </ul>
    </SubSectionContainer>
  );
};

export default ExperienceSubSection;
