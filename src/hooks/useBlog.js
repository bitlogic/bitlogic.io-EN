import { useStaticQuery, graphql } from "gatsby"

const useBlog = () => {
  const query = useStaticQuery(graphql`
    {
      allStrapiBlogCategory:allStrapiEnglishBlogCategory {
        nodes {
          name
        }
      }
      allStrapiArticle:allStrapiEnglishArticle(sort: { fields: published_at, order: DESC }) {
        nodes {
          title
          summary
          slug
          image {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          
          blog_category {
            name
          }
        }
      }
      allStrapiBlogPage: allStrapiEnglishBlogPage {
        nodes {
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
            button {
              content
              id
              url
              landing_page:english_landing_page {
                name
                slug
                id
              }
            }
            image {
              alternativeText
              url
            }
            animation
          }
        }
      }
    }
  `)
  return query
}

export default useBlog
