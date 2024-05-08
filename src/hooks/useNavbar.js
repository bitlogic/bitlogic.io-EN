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
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                  )
                }
              }
            }
            logoDark {
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                  )
                }
              }
            }
          }
          Menu {
            title
            id
            visible
            dropdown
            url
            english_landing_page {
              slug
            }
            dropdownItems {
              id
              label
              icon {
                alternativeText
                url
                localFile {
                  childrenImageSharp {
                    gatsbyImageData(
                      placeholder: BLURRED
                    )
                  }
                }
              }
              english_landing_page {
                slug
              }
            }
            toplevelItem {
              id
              label
              text
              url
              icon {
                localFile {
                  childrenImageSharp {
                    gatsbyImageData(
                      placeholder: BLURRED
                    )
                  }
                }
                alternativeText
              }
              english_landing_page {
                slug
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
