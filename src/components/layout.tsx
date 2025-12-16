import * as React from 'react';
import { FC, ReactNode } from 'react';
import Footer from './Footer';

interface ILayoutProps {
  title: string;
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ title, children }) => {
  return (
    <>
      <main>
        {React.Children.map(children, child => (
          <div className="min-h-screen max-w-content min-w-screen-min mx-auto px-8 py-8 md:px-16 2xl:px-32">
            {child}
          </div>
        ))}
      </main>
      <Footer title={title} />
    </>
  );
};

export default Layout;
