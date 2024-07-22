import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { CustomSection, Seo } from "../components/index"

const LandingPage = ({ data, location }) => {
  const pageData = data?.allStrapiLandingPage?.nodes[0]
  const {
    pageKeywords,
    pageDescription,
  } = data?.allStrapiLandingPage?.nodes[0].seo

  return (
    <Layout location={location} options={{ hasHeader: true }}>
      <Seo
        title={pageData.name}
        description={pageDescription}
        keywords={pageKeywords}
      />
      <CustomSection sections={pageData?.body} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allStrapiLandingPage: allStrapiEnglishLandingPage(
      filter: { slug: { eq: $slug } }
    ) {
      nodes {
        name
        seo {
          pageKeywords
          pageDescription
        }
        body {
          id
          strapi_component
          title
          subtitle
          text
          summary
          description
          content
          animation
          variant
          show
          profileDescription
          imagePosition
          form_url
          contactFormAnchor
          contactForm
          color
          callToAction
          allBlog
          allCases
          videoUrl
          video {
            url
          }
          profile {
            alternativeText
            url
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          eng_professionals {
            id
            name
            position
            quote
            linkedin
            photo {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          media {
            id
            name
            img {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            imageDark {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          items {
            id
            title
            text
            english_landing_page {
              slug
            }
            image {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          imageDark {
            alternativeText
            url
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          image {
            alternativeText
            url
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          dualSectionPart {
            id
            title
            description
            button {
              content
              url
              english_landing_page {
                slug
              }
            }
            backgroundImage {
              url
            }
            backgroundImageDark {
              url
            }
            image {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          english_cases {
            id
            title
            subtitle
            description
            button {
              content
              url
              english_landing_page {
                slug
              }
            }
            image {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            quote {
              title
              description
              variant
              profile {
                alternativeText
                url
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              image {
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
          button {
            content
            url
            english_landing_page {
              slug
            }
          }
          backgroundImageDark {
            url
          }
          backgroundImage {
            url
          }
          english_articles {
            id
            title
            summary
            slug
            published_at
            imagePage {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            image {
              alternativeText
              url
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          ListItem {
            id
            title
            description
            english_landing_page {
              slug
            }
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
          Card {
            id
            title
            description
            english_landing_page {
              slug
            }
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
`
export default LandingPage
