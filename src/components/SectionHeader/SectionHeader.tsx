import * as React from 'react';
import { FC } from 'react';

interface ISectionHeaderProps {
  title: string;
  reverse?: boolean;
}

const SectionHeader: FC<ISectionHeaderProps> = ({ reverse = false, title }) => (
  <div className={`flex items-end ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
    <h2
      className={`text-6xl leading-none text-neon-pink ${
        reverse ? 'ml-4 mr-0' : 'mr-4 ml-0'
      }`}
    >
      {title}
    </h2>
    <div className="flex-1 h-[3px] border-b-[3px] border-neon-pink mb-1" />
  </div>
);

export default SectionHeader;
