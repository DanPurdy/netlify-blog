import React, { FC } from 'react';
import styled from 'styled-components';
import { IExperienceType } from '../../types/content';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { colors } from '../../theme';

const ExperienceContainer = styled.section`
  /* display: flex; */
`;

const ExperienceSectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ExperienceSectionTitle = styled.h2`
  font-size: 4rem;
  line-height: 1;
  color: ${colors.underlineColor};
  margin: 0 0 0 2rem;
`;

const ExperienceSectionLine = styled.div`
  flex: 1 1 auto;
  height: 3px;
  border-bottom: 3px solid ${colors.underlineColor};
  margin-bottom: 0.4rem;
`;

const SubSectionTitle = styled.h4`
  font-size: 1.6rem;
`;

const OpenSourceSection: FC = () => {
  return (
    <ExperienceContainer>
      <ExperienceSectionHeader>
        <ExperienceSectionLine />
        <ExperienceSectionTitle>Open Source</ExperienceSectionTitle>
      </ExperienceSectionHeader>
    </ExperienceContainer>
  );
};

export default OpenSourceSection;
