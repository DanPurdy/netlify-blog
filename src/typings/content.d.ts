interface IExperienceNodeType {
  body: string;
  frontmatter: {
    startDate: string;
    endDate: string;
    id: string;
    isCurrent: boolean;
    logo: {
      publicURL: string;
    };
    title: string;
    position: string[];
    previousPosition: string[];
    url: string;
  };
}

interface IExperienceType {
  edges: {
    node: IExperienceNodeType;
  }[];
}

interface IPersonalType {
  edges: {
    node: {
      childMdx: {
        body: string;
        frontmatter: {
          title: string;
          subtitle: string;
        };
      };
    };
  }[];
}
