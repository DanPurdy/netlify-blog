import * as React from 'react';
import { FC } from 'react';

import LinkedInIcon from '../../content/assets/svg/linked-in.svg';
import GithubIcon from '../../content/assets/svg/github.svg';

const SocialLinks: FC = () => {
  return (
    <section className="flex justify-center my-20 mb-8 xl:justify-start">
      <a
        href="https://github.com/danpurdy"
        aria-label="Find me on Github"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[60px] h-[60px] rounded-full border-2 border-neon-pink flex justify-center items-center mr-4 p-2 no-underline"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/dan-purdy-developer"
        aria-label="Find me on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[60px] h-[60px] rounded-full border-2 border-neon-pink flex justify-center items-center mr-4 p-2 no-underline"
      >
        <LinkedInIcon />
      </a>
    </section>
  );
};

export default SocialLinks;
