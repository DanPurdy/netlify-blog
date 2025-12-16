import * as React from 'react';
import { FC, ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
}

const SectionContainer: FC<SectionContainerProps> = ({ children }) => (
  <section className="mt-40 mb-24 2xl:px-4 md:px-0">{children}</section>
);

export default SectionContainer;
