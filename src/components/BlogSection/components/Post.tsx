/// <reference path="../../../typings/content.d.ts" />

import * as React from 'react';
import { FC } from 'react';
import { Link } from 'gatsby';

interface IPost {
  node: IPostType;
}

const Post: FC<IPost> = ({ node }) => {
  return (
    <Link
      to={`/blog${node.fields.slug}`}
      className="block no-underline mb-28 transition-colors duration-200 group"
    >
      <h3 className="text-bold-yellow text-2xl lg:text-4xl leading-tight m-0 mb-5 group-hover:text-pastel-blue">
        {node.frontmatter.title}
      </h3>
      <div className="text-lg md:text-xl leading-relaxed">
        <p>{node.frontmatter.description}</p>
      </div>
      <div className="text-lg md:text-lg group-hover:underline">Read more</div>
    </Link>
  );
};

export default Post;
