/// <reference path="../../../typings/content.d.ts" />

import * as React from 'react';
import { FC } from 'react';
import Post from './Post';

interface IPostProps {
  posts: IPostsType;
}

const Posts: FC<IPostProps> = ({ posts }) => {
  return (
    <div className="my-20 mb-12 px-4 xl:px-0">
      {posts.edges.map(({ node }) => (
        <Post key={node.fields.slug} node={node} />
      ))}
    </div>
  );
};

export default Posts;
