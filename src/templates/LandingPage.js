import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { CustomSection, Seo } from '../components/index'

const LandingPage = ({ data, location }) => {
  const pageData = data?.allStrapiLandingPage?.nodes[0]
  const { pageKeywords, pageDescription } = data?.allStrapiLandingPage?.nodes[0].seo

  return (
    <Layout location={location} options={{ hasHeader: true }}>
      <Seo title={pageData.name}
        description={pageDescription}
        keywords={pageKeywords}
      />
      <CustomSection sections={pageData?.body} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allStrapiLandingPage:allStrapiEnglishLandingPage(filter: { slug: { eq: $slug } }) {
      nodes {
        body
        name
        seo {
          pageKeywords
          pageDescription
        }
      }
    }
  }
`
export default LandingPage
