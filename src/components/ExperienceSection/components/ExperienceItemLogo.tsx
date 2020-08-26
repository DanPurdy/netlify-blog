import React, { FC } from 'react';
import styled from 'styled-components';

interface IExperienceItemLogo {
  altText: string;
  publicURL: string;
  url: string;
}

const ItemLogoContainer = styled.div`
  width: 100%;
  margin: 0 0 7rem;
`;

const ItemLogo = styled.img`
  width: 100%;
  max-width: 300px;
`;

const ExperienceItemLogo: FC<IExperienceItemLogo> = ({
  altText,
  publicURL,
  url,
}) => {
  return (
    <ItemLogoContainer>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <ItemLogo src={publicURL} alt={`${altText} logo`}></ItemLogo>
      </a>
    </ItemLogoContainer>
  );
};

export default ExperienceItemLogo;
