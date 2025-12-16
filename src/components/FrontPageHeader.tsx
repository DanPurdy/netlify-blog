import * as React from 'react';
import { FC } from 'react';

interface FrontPageHeaderProps {
  subtitle: string;
  title: string;
}

const FrontPageHeader: FC<FrontPageHeaderProps> = ({ subtitle, title }) => {
  return (
    <header className="my-6 mb-40 text-center lg:mb-20 xl:mb-32">
      <h1 className="mt-8 mb-4 text-6xl tracking-tighter-5 sm:text-7xl md:text-8xl md:tracking-tighter-7 lg:text-9xl lg:tracking-tighter-8">
        {title}
      </h1>
      <h2 className="my-4 text-neon-pink text-4xl md:text-4-5xl lg:text-5xl tracking-tighter-2">
        {subtitle}
      </h2>
    </header>
  );
};

export default FrontPageHeader;
