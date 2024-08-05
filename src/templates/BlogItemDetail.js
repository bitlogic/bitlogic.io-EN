import React from "react"
import { graphql } from "gatsby"
// import showdown from "showdown"
// import ReactMarkdown from "react-markdown"
import MarkdownView from "react-showdown"
import Layout from "../components/layout"
import { Seo, BannerTop } from "../components/index.js"
import "./BlogItemDetail.scss"
import PropTypes from "prop-types"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const BlogDetail = ({ data }) => {
  const {
    title,
    description,
    image,
    imagePage,
    author,
    seo,
  } = data?.allStrapiArticle?.nodes[0] || {}

  const bannerTop = imagePage ? { title, imagePage } : { title, image }

  // let { summary } = author

  return (
    <Layout>
      <Seo
        title={title}
        description={seo?.pageDescription}
        keywords={seo?.pageKeywords}
      />
      <BannerTop banner={bannerTop} />
      <div className="detail__container row">
        <div className="col-lg-12">
          <div className="detail__description">
            <MarkdownView
              markdown={description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {/* <ReactMarkdown source={description} /> */}
            <div className="detail__description-author">
              {author?.map(author => (
                <div className="detail__box-author">
                  {author.image && (
                    <div className="detail__box-author-image">
                      <GatsbyImage
                        image={getImage(author?.image?.localFile)}
                        alt={
                          author.image.alternativeText
                            ? author.image.alternativeText
                            : author?.name
                        }
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
                gatsbyImageData: PropTypes.object.isRequired
              })
            })
          }),
          imagePage: PropTypes.shape({
            url: PropTypes.string,
            alternativeText: PropTypes.string,
            localFile: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                gatsbyImageData: PropTypes.object.isRequired
              })
            })
          }),
          author: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              subTitle: PropTypes.string,
              summary: PropTypes.string,
              image: PropTypes.shape({
                url: PropTypes.string.isRequired,
                alternativeText: PropTypes.string,
                localFile: PropTypes.shape({
                  childImageSharp: PropTypes.shape({
                    gatsbyImageData: PropTypes.object.isRequired
                  })
                })
              })
            })
          )
        })
      )
    })
   })
}

export const query = graphql`
  query($slug: String!) {
    allStrapiArticle: allStrapiEnglishArticle(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        description
        slug
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
