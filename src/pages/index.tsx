import React, { FC, ReactElement } from "react"
import { RouteComponentProps } from "@reach/router"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

import ExperienceSection from "../components/ExperienceSection"

import { IExperienceType, IPersonalType } from "../types/content"

interface IndexProps extends RouteComponentProps {
  data: {
    experience: IExperienceType
    personal: IPersonalType
    projects: {}
    site: {}
  }
}

const IndexPage: FC<IndexProps> = ({ data, location }) => {
  const siteTitle = "Gatsby Starter Personal Website"

  const { experience, personal, projects, site } = data
  const {
    node: {
      childMdx: {
        body,
        frontmatter: { title, subtitle },
      },
    },
  } = personal.edges[0]

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <MDXRenderer>{body}</MDXRenderer>

      <ExperienceSection experience={experience} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    personal: allFile(filter: { name: { eq: "personal_details" } }) {
      edges {
        node {
          id
          name
          childMdx {
            body
            frontmatter {
              title
              subtitle
            }
          }
        }
      }
    }
    experience: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/experience/.*.md$/" } }
    ) {
      edges {
        node {
          body
          frontmatter {
            startDate(formatString: "MMM YYYY")
            endDate(formatString: "MMM YYYY")
            isCurrent
            title
            position
          }
        }
      }
    }
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/projects/.*.md$/" } }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            company
          }
        }
      }
    }
  }
`
