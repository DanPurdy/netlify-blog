import * as React from 'react';
import { FC, ReactNode } from 'react';

interface SubSectionContainerProps {
  children: ReactNode;
}

const SubSectionContainer: FC<SubSectionContainerProps> = ({ children }) => {
  return (
    <div className="mb-6 text-exp leading-exp font-normal md:text-lg md:leading-relaxed">
      {children}
    </div>
  );
};

export default SubSectionContainer;
