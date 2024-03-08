import { useStaticQuery, graphql } from "gatsby"

const useNavbar = () => {
  return useStaticQuery(graphql`
    {
      allStrapiLayout:allStrapiEnglishLayout {
        nodes {
          navbar {
            navButton {
              landing_page {
                slug
              }
              url
              content
            }
            navbarItem {
              url
              label
              singleType
              landing {
                slug
                name
              }
              dropdown
              id
            }
            logo {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                  )
                }
              }
            }
            logoDark {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                  )
                }
              }
            }
          }
        }
      }
      allStrapiLandingPage: allStrapiEnglishLandingPage {
        nodes {
          body
          name
        }
      }
      allStrapiHome:allStrapiEnglishHome {
        nodes {
          body
        }
      }
    }
    
  `)
}

export default useNavbar
