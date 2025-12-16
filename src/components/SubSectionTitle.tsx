import * as React from 'react';
import { FC, ReactNode } from 'react';

interface SubSectionTitleProps {
  children: ReactNode;
}

const SubSectionTitle: FC<SubSectionTitleProps> = ({ children }) => {
  return (
    <h4 className="m-0 mb-1 text-lg text-pastel-blue font-normal xl:text-base">
      {children}
    </h4>
  );
};

export default SubSectionTitle;
