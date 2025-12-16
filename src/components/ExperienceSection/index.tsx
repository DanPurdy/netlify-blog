import * as React from 'react';
import { FC } from 'react';

import ExperienceItems from './components/ExperienceItems';
import SectionHeader from '../SectionHeader/SectionHeader';
import SectionContainer from '../SectionContainer';

interface IExperienceProps {
  experience: IExperienceType;
}

const ExperienceSection: FC<IExperienceProps> = ({ experience }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Work" />
      <ExperienceItems experience={experience} />
    </SectionContainer>
  );
};

export default ExperienceSection;
