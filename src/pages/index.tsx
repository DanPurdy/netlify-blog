import React, { FC } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { MDXRenderer } from "gatsby-plugin-mdx"

const IndexPage: FC = (props) => {
  const siteTitle = "Gatsby Starter Personal Website"

  const {experience, personal, projects, site} = props.data;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />
      <h1>
        Hey people{" "}
        <span role="img" aria-label="wave emoji">
          👋
        </span>
      </h1>
      <MDXRenderer>{experience.edges[0].node.body}</MDXRenderer>
      <p>Welcome to your new Gatsby website. You are on your home page.</p>
      <p>
        This starter comes out of the box with styled components and Gatsby's
        default starter blog running on Netlify CMS.
      </p>
      <p>Now go build something great!</p>
      <Link to="/blog/">
        <Button marginTop="35px">Go to Blog</Button>
      </Link>
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
    personal: allFile(
      filter: { name: {eq:"personal_details"}}
    ) {
      edges {
        node {
          id
          name
          childMdx {
            body
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
