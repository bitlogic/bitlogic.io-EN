import { useStaticQuery, graphql } from "gatsby"

const useContactPage = () => {
  return useStaticQuery(graphql`
    {
      allStrapiCase:allStrapiEnglishCase {
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
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          image {
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

export default useContactPage
