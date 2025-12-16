import * as React from 'react';
import { FC } from 'react';

import SubSectionContainer from '../../SubSectionContainer';
import SubSectionTitle from '../../SubSectionTitle';

interface IExperienceDateSectionProps {
  endDate?: string;
  isCurrent: boolean;
  startDate: string;
  title: string;
}

const ExperienceDateSection: FC<IExperienceDateSectionProps> = ({
  endDate,
  isCurrent,
  startDate,
  title,
}) => {
  return (
    <SubSectionContainer>
      <SubSectionTitle>{title}</SubSectionTitle>
      {startDate} - {isCurrent ? 'Now' : endDate}
    </SubSectionContainer>
  );
};

export default ExperienceDateSection;
