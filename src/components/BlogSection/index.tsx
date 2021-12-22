/// <reference path="../../typings/content.d.ts" />

import React, { FC } from 'react';

import Posts from './components/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';
import SectionContainer from '../SectionContainer';

interface IPostsProps {
  posts: IPostsType;
}

const ExperienceSection: FC<IPostsProps> = ({ posts }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Blog" />
      <Posts posts={posts} />
    </SectionContainer>
  );
};

export default ExperienceSection;
