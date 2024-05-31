import { useStaticQuery, graphql } from "gatsby"

const useFooter = () => {
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
            navbarItem {
              label
              url
              singleType
              landing: english_landing_page {
                name
                slug
              }
            }
          }
          footer {
            contact {
              title
              iconText {
                name
                icon {
                  code
                  name
                  type
                }
              }
            }
            internalLink {
              name
              pathTo
            }
            location {
              title
              iconText {
                name
                icon {
                  code
                  name
                  type
                }
              }
            }
            logo {
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 139, height: 41)
                }
              }
            }
            navegation {
              title
            }
            socialMedia {
              socialMedia {
                name
                url
                id
                icon {
                  code
                  type
                  name
                }
              }
            }
            subscription {
              title
              landing: english_landing_page {
                slug
              }
              callToAction
              url
            }
          }
          Sites {
            title
            websites {
              id
              name
              url
              icon {
                alternativeText
                url
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }          
    }       
  `)
}

export default useFooter

