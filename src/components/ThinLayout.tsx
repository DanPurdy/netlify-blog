import * as React from 'react';
import { FC, ReactNode } from 'react';
import FooterThin from './FooterThin';

interface ILayoutProps {
  author: string;
  location?: Location;
  children: ReactNode;
}

const ThinLayout: FC<ILayoutProps> = ({ author, children }) => {
  return (
    <main>
      <div className="max-w-content-thin min-w-screen-min min-h-[85vh] mx-auto px-4 md:px-8">
        {React.Children.map(children, child => child)}
      </div>
      <FooterThin title={author} />
    </main>
  );
};

export default ThinLayout;
