/// <reference path="../../typings/content.d.ts" />

import * as React from 'react';
import { FC } from 'react';

import Posts from './components/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';
import SectionContainer from '../SectionContainer';

interface IPostsProps {
  posts: IPostsType;
}

const BlogSection: FC<IPostsProps> = ({ posts }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Blog" />
      <Posts posts={posts} />
    </SectionContainer>
  );
};

export default BlogSection;
