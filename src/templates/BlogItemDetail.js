import React from "react"
import { graphql } from "gatsby"
import MarkdownView from "react-showdown"
import Layout from "../components/layout"
import { Seo, BannerTop } from "../components/index.js"
import "./BlogItemDetail.scss"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const BlogDetail = ({ data }) => {
  const { title, description, image, imagePage, author, seo, published_at, updated_at } =
    data?.allStrapiArticle?.nodes[0] || {}

  const bannerTop = imagePage ? { title, imagePage } : { title, image }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seo?.pageTitle || title, // Usa pageTitle de SEO o el título
    "description": seo?.pageDescription || description,
    "image": imagePage?.url || image?.url, // Imagen principal
    "author": author?.map(auth => ({
      "@type": "Person",
      "name": auth.name,
    })),
    "datePublished": published_at, // Ajusta con la fecha real
    "dateModified": updated_at, // Ajusta con la fecha real
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://es.bitlogic.io/blog/${data?.allStrapiArticle?.nodes[0]?.slug}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bitlogic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bitlogic.io/static/64f396cb88cfcbfda46b86c5218242f2/de081/Logo_Bit_azul_7e725e9726.webp", // URL del logo del sitio
      },
    },
  }

  return (
    <Layout>
      <Seo
        title={seo?.pageTitle}
        description={seo?.pageDescription}
        keywords={seo?.pageKeywords}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <BannerTop banner={bannerTop} />
      <div className="detail__container row">
        <div className="col-lg-12">
          <div className="detail__description">
            <MarkdownView
              markdown={description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="detail__description-author">
              {author?.map(author => (
                <div className="detail__box-author" key={author.id}>
                  {author.image && (
                    <div className="detail__box-author-image">
                      <GatsbyImage
                        image={getImage(author?.image?.localFile)}
                        alt={author.image.alternativeText || author?.name}
                      />
                    </div>
                  )}
                  <div className="detail__box-autor-description">
                    <h5>{author?.name}</h5>
                    <h6>{author?.subTitle}</h6>
                    <p>{author?.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

BlogDetail.propTypes = {
  data: PropTypes.shape({
    allStrapiArticle: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          image: PropTypes.shape({
            url: PropTypes.string.isRequired,
            alternativeText: PropTypes.string,
            localFile: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                gatsbyImageData: PropTypes.object.isRequired,
              }),
            }),
          }),
          imagePage: PropTypes.shape({
            url: PropTypes.string,
            alternativeText: PropTypes.string,
            localFile: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                gatsbyImageData: PropTypes.object.isRequired,
              }),
            }),
          }),
          author: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              name: PropTypes.string.isRequired,
              subTitle: PropTypes.string,
              summary: PropTypes.string,
              image: PropTypes.shape({
                url: PropTypes.string,
                alternativeText: PropTypes.string,
                localFile: PropTypes.shape({
                  childImageSharp: PropTypes.shape({
                    gatsbyImageData: PropTypes.object.isRequired,
                  }),
                }),
              }),
            })
          ),
        })
      ),
    }),
  }),
}

export const query = graphql`
  query($slug: String!) {
    allStrapiArticle: allStrapiEnglishArticle(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        description
        slug
        published_at
        updated_at
        destacado
        seo {
          pageTitle
          pageDescription
          pageKeywords
        }
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
          alternativeText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        author {
          id
          name
          subTitle
          summary
          image {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(width: 150, height: 150)
              }
            }
          }
        }
      }
    }
  }
`
export default BlogDetail
