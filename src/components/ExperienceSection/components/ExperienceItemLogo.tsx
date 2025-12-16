import * as React from 'react';
import { FC } from 'react';

interface IExperienceItemLogo {
  altText: string;
  publicURL: string;
  url: string;
}

const ExperienceItemLogo: FC<IExperienceItemLogo> = ({
  altText,
  publicURL,
  url,
}) => {
  return (
    <div className="w-full">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={publicURL}
          alt={`${altText} logo`}
          className="w-full max-w-[300px]"
        />
      </a>
    </div>
  );
};

export default ExperienceItemLogo;
