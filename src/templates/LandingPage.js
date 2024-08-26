import React, { useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { CustomSection, Seo, Navigation } from "../components/index"
import PropTypes from "prop-types"

const LandingPage = ({ data, location }) => {
  const { name, slug, parent_page, seo, body, navigation } =
    data?.allStrapiLandingPage?.nodes[0] || {}

  const wrapperRef = useRef(null)
  const landing = {
    name,
    slug,
    parent_page,
    ref: wrapperRef,
  }

  const { pageKeywords, pageDescription } = seo || {}

  return (
    <Layout location={location} options={{ hasHeader: true }}>
      <Seo
        title={pageData.name}
        description={pageDescription}
        keywords={pageKeywords}
      />
      {body?.length > 0 && navigation ? (
        <>
          <CustomSection sections={body.slice(0, 1)} />
          <div
            ref={wrapperRef}
            className="wrapper-container d-flex flex-column flex-lg-row"
          >
            <Navigation data={navigation} landing={landing} />
            <div className="content-section flex-grow-1">
              <CustomSection sections={body.slice(1)} />
            </div>
          </div>
        </>
      ) : (
        <CustomSection sections={body} />
      )}
    </Layout>
  )
}

LandingPage.propTypes = {
  data: PropTypes.shape({
    allStrapiLandingPage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          body: PropTypes.arrayOf(PropTypes.object),
          seo: PropTypes.shape({
            pageTitle: PropTypes.string,
            pageDescription: PropTypes.string.isRequired,
            pageKeywords: PropTypes.string,
          }),
        })
      ),
    }),
  }),
  location: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    allStrapiLandingPage: allStrapiEnglishLandingPage(
      filter: { slug: { eq: $slug } }
    ) {
      nodes {
        name
        slug
        parent_page {
          slug
        }
        seo {
          pageKeywords
          pageDescription
        }
        navigation {
          title
          showSiblingPages
          relatedPages {
            title
            pages {
              id
              content
              url
              landing_page {
                name
                slug
              }
            }
          }
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
          concactFormAnchor
          contactForm
          color
          callToAction
          allBlog
          allCases
          videoUrl
          video {
            url
            mime
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
