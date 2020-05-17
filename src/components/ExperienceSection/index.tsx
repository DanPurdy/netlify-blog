import React, { FC } from 'react';
import { IExperienceType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';

interface IExperienceProps {
  experience: IExperienceType;
}

const ExperienceSection: FC<IExperienceProps> = ({ experience }) => {
  return (
    <section>
      <h3>Experience</h3>
      {experience.edges.map(({ node }) => (
        <>
          <h3>{node.frontmatter.title}</h3>
          <h4>Employed</h4>
          <h4>Current Position</h4>
          <ul></ul>
          <h4>Previous Positions</h4>
          <MDXRenderer>{node.body}</MDXRenderer>
        </>
      ))}
    </section>
  );
};

export default ExperienceSection;
