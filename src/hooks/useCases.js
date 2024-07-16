import { useStaticQuery, graphql } from "gatsby"

const useCases = () => {
  return useStaticQuery(graphql`
    {
      allStrapiCase: allStrapiEnglishCase {
        nodes {
          strapiId
          title
          subtitle
          description
          quote {
            description
            title
            variant
            profile {
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          image {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          button {
            content
            id
            url
            landing_page: english_landing_page {
              slug
            }
          }
        }
      }
    }
  `)
}

export default useCases
