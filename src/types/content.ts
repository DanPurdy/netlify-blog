export interface IExperienceType {
  edges: {
    node: {
      body: string
      frontmatter: {
        startDate: string
        endDate: string
        isCurrent: boolean
        title: string
        position: string[]
        previousPositions: string[]
      }
    }
  }[]
}

export interface IPersonalType {
  edges: {
    node: {
      childMdx: {
        body: string
        frontmatter: {
          title: string
          subtitle: string
        }
      }
    }
  }[]
}
