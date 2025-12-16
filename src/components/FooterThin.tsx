import { Link } from 'gatsby';
import * as React from 'react';
import { FC } from 'react';

interface FooterProps {
  title: string;
}

const FooterThin: FC<FooterProps> = ({ title }) => {
  return (
    <div className="max-w-content-thin min-w-screen-min mx-auto p-4 block flex-shrink-0 md:flex md:items-end md:justify-start md:px-8 md:py-6 md:pb-10">
      <Link to="/" className="no-underline">
        <h3 className="text-4xl leading-none m-0 tracking-tighter-2 md:text-5xl">{title}</h3>
      </Link>
      <ul className="m-0 py-4 p-0 list-none flex md:ml-4 md:py-0">
        <li>
          <Link
            to="/blog"
            className="text-base ml-4 no-underline border-b border-portfolio-bg text-neon-pink transition-all duration-300 hover:border-neon-pink hover:text-white hover:opacity-90 md:first:ml-0"
          >
            Blog
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/danpurdy"
            aria-label="Find me on Github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base ml-4 no-underline border-b border-portfolio-bg text-neon-pink transition-all duration-300 hover:border-neon-pink hover:text-white hover:opacity-90"
          >
            Github
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterThin;
