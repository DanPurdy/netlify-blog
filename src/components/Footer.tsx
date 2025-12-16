import { Link } from 'gatsby';
import * as React from 'react';
import { FC } from 'react';

interface FooterProps {
  title: string;
}

const Footer: FC<FooterProps> = ({ title }) => {
  return (
    <div className="max-w-content min-w-screen-min mx-auto px-8 pt-4 pb-8 block flex-shrink-0 md:flex md:items-end md:justify-start md:px-16 md:pt-8 md:pb-12 2xl:px-32 2xl:pt-12 2xl:pb-20">
      <Link to="/" className="no-underline">
        <h3 className="leading-none m-0 tracking-tighter-2">{title}</h3>
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

export default Footer;
