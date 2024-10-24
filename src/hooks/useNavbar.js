import { useStaticQuery, graphql } from "gatsby"

const useNavbar = () => {
  return useStaticQuery(graphql`
    {
      allStrapiLayout: allStrapiEnglishLayout {
        nodes {
          navbar {
            navButton {
              content
              url
              landing_page: english_landing_page {
                slug
              }
            }
            logo {
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
            logoDark {
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
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
              text
              url
              icon {
                alternativeText
                url
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                  }
                }
              }
              english_landing_page {
                slug
              }
              english_sub_landing_pages {
                id
                slug
                name
              }
            }
            toplevelItem {
              id
              label
              text
              url
              icon {
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
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
          parent_page {
            slug
          }
        }
      }
    }
  `)
}

export default useNavbar
