/// <reference path="../../../typings/content.d.ts" />

import React, { FC } from 'react';
import Post from './Post';
import styled from 'styled-components';
import { breakpoints } from '../../../theme';

interface IPostProps {
  posts: IPostsType;
}

const PostsContainer = styled.div`
  margin: 10rem 0 6rem;
  padding: 0 2rem;

  @media (max-width: ${breakpoints.palm}) {
    padding: 0;
  }
`;

const Posts: FC<IPostProps> = ({ posts }) => {
  return (
    <PostsContainer>
      {posts.edges.map(({ node }) => (
        <Post key={node.fields.slug} node={node} />
      ))}
    </PostsContainer>
  );
};

export default Posts;
