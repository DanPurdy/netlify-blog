import * as React from 'react';
import { FC } from 'react';
import ExperienceItem from './ExperienceItem';

interface IExperienceItemProps {
  experience: IExperienceType;
}

const ExperienceItems: FC<IExperienceItemProps> = ({ experience }) => {
  return (
    <div className="my-20 mb-12">
      {experience.edges.map(({ node }) => (
        <ExperienceItem key={node.frontmatter.id} node={node} />
      ))}
    </div>
  );
};

export default ExperienceItems;
