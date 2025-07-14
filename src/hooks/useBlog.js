import { useStaticQuery, graphql } from "gatsby"

const useBlog = () => {
  const query = useStaticQuery(graphql`
    {
      allStrapiBlogCategory: allStrapiEnglishBlogCategory(sort: { fields: orden, order: ASC }) {
        nodes {
          name
          slug
          orden
        }
      }
      allStrapiArticle: allStrapiEnglishArticle(
        sort: { fields: published_at, order: DESC }
      ) {
        nodes {
          title
          id
          summary
          slug
          destacado
          image {
            url
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imagePage {
            url
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }

          blog_category {
            name
            slug
          }
          seo {
            pageTitle
            pageKeywords
            pageDescription
          }
        }
      }
      allStrapiBlogPage: allStrapiEnglishBlogPage {
        nodes {
          callToAction
          seo: pageMetadata {
            pageTitle
            pageKeywords
            pageDescription
          }
          banner {
            id
            title
            variant
            summary
            animation
            button {
              content
              id
              url
              landing_page: english_landing_page {
                name
                slug
                id
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
      }
    }
  `)
  return query
}

export default useBlog
