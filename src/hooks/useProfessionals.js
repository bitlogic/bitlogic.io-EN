import { useStaticQuery, graphql } from "gatsby"

const useContactPage = () => {
  return useStaticQuery(graphql`
    {
      allStrapiProfessional: allStrapiEnglishProfessional {
        nodes {
          quote
          position
          name
          linkedin
          strapiId
          id
          photo {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)
}

export default useContactPage
