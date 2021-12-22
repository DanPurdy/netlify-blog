/// <reference path="../../../typings/content.d.ts" />

import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colors } from '../../../theme';

interface IPost {
  node: IPostType;
}

const PostTitle = styled.h3`
  color: ${colors.blogSubHeading};
  font-size: 2.5rem;
  line-height: 1.3;
  margin: 0 0 2.5rem;
`;

const PostLink = styled.div`
    font-size: 1.8rem;
  }
`;

const PostContainer = styled(Link)`
  display: block;
  text-decoration: none;
  transition: color 2s ease-in-out;
  margin-bottom: 7rem;


  &:hover ${PostTitle} {
      color: ${colors.pastelBlue};
    }
  }

  &:hover ${PostLink} {
    text-decoration: underline;
  }
`;

const PostContent = styled.div`
  font-size: 1.8rem;
  line-height: 1.8;
`;

const Post: FC<IPost> = ({ node }) => {
  return (
    <PostContainer to={`/blog${node.fields.slug}`}>
      <PostTitle>{node.frontmatter.title}</PostTitle>
      <PostContent>
        <p>{node.frontmatter.description}</p>
      </PostContent>
      <PostLink>Read more</PostLink>
    </PostContainer>
  );
};

export default Post;
