interface IExperienceNodeType {
  excerpt: string;
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
        excerpt: string;
        frontmatter: {
          title: string;
          subtitle: string;
        };
      };
    };
  }[];
}

interface IPostsType {
  edges: {
    node: IPostType;
  }[];
}

interface IPostType {
  excerpt: string;
  fields: {
    readingTime: string;
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
}
