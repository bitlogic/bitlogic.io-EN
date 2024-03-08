import { useStaticQuery, graphql } from "gatsby"

const useHomePage = () => {
  const query = useStaticQuery(graphql`
  query allStrapiHome {
    allStrapiHome:allStrapiEnglishHome {
      nodes {
        body
        pageMetadata {
          pageDescription
          pageKeywords
          pageTitle
        }
      }
    }
  }
  `)
  return query
}

export default useHomePage
