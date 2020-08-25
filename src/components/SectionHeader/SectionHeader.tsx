import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

interface ISectionHeaderStyleProps {
  reverse?: boolean;
}

interface ISectionHeaderProps extends ISectionHeaderStyleProps {
  title: string;
}

const MainSectionHeader = styled.div<ISectionHeaderStyleProps>`
  display: flex;
  align-items: flex-end;
  flex-direction: ${({ reverse }) => (reverse ? `row-reverse` : `row`)};
`;

const MainSectionTitle = styled.h2<ISectionHeaderStyleProps>`
  font-size: 4rem;
  line-height: 1;
  color: ${colors.underlineColor};
  margin: ${({ reverse }) => (reverse ? `0 0 0 2rem` : `0 2rem 0 0`)};
`;

const MainSectionLine = styled.div`
  flex: 1 1 auto;
  height: 3px;
  border-bottom: 3px solid ${colors.underlineColor};
  margin-bottom: 0.4rem;
`;

const SectionHeader: FC<ISectionHeaderProps> = ({ reverse = false, title }) => (
  <MainSectionHeader reverse={reverse}>
    <MainSectionTitle reverse={reverse}>{title}</MainSectionTitle>
    <MainSectionLine />
  </MainSectionHeader>
);

export default SectionHeader;
