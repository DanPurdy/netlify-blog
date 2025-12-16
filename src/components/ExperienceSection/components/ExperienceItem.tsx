import * as React from 'react';
import { FC } from 'react';
import Markdown from 'react-markdown';

import ExperienceDateSection from './ExperienceDateSection';
import ExperienceSubSection from './ExperienceSubsection';
import ExperienceItemLogo from './ExperienceItemLogo';

interface IExperienceItem {
  node: IExperienceNodeType;
}

const ExperienceItem: FC<IExperienceItem> = ({ node }) => {
  return (
    <div className="mb-48">
      {/* Logo - full width on its own row */}
      <div className="mb-14">
        <ExperienceItemLogo
          altText={node.frontmatter.title}
          publicURL={node.frontmatter.logo.publicURL}
          url={node.frontmatter.url}
        />
      </div>
      {/* Content row: dates/position on left, description on right */}
      <div className="flex flex-col xl:flex-row">
        {/* Left: Dates and position info - STACKED VERTICALLY */}
        <div className="mb-8 pb-4 border-b border-faded-line xl:flex-[1_1_30%] xl:border-b-0 xl:pb-0 xl:mb-0 xl:pr-8">
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
          {node.frontmatter.previousPosition &&
          node.frontmatter.previousPosition.length ? (
            <ExperienceSubSection
              node={node}
              sectionName="previousPosition"
              title="Previous Positions"
            />
          ) : null}
        </div>
        {/* Right: Description */}
        <div className="leading-exp text-white xl:flex-[3_3_70%] md:text-xl/10 md:leading-relaxed [&>p]:mb-10 [&>p:last-child]:mb-0">
          <Markdown>{node.body}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
