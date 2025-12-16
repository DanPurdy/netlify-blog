import * as React from 'react';
import { FC } from 'react';

import SectionContainer from '../SectionContainer';
import SectionHeader from '../SectionHeader/SectionHeader';

const OpenSourceSection: FC = () => {
  return (
    <SectionContainer>
      <SectionHeader title="Open Source" reverse />
    </SectionContainer>
  );
};

export default OpenSourceSection;
