import { useStaticQuery, graphql } from "gatsby"

const useNavbar = () => {
  return useStaticQuery(graphql`
    {
      allStrapiLayout:allStrapiEnglishLayout {
        nodes {
          navbar {
            navButton {
              content
              url
              landing_page: english_landing_page {
                slug
              }
            }
            navbarItem {
              id
              label
              dropdown
              url
              singleType
              landing: english_landing_page {
                slug
              }
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
          name
          slug
          body
          parent_page {
            slug
          }
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

export default useNavbar;
