import React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
// import ReactMarkdown from "react-markdown"
import MarkdownView from "react-showdown"
import "./BlogArticle.scss"

const BlogArticle = ({ title, summary, image, slug, text }) => {
  const imageArticle = getImage(image?.localFile)

  return (
    <div className="article__container">
      {imageArticle ? (
        <GatsbyImage
          image={imageArticle}
          alt={image?.alternativeText
            ? image.alternativeText
            : title
          }
          className="article__image"
          width={140}
          height={170}
        />
      ) : (
        <img src={image?.url}
          alt={image?.alternativeText
            ? image.alternativeText
            : title
          }
          className="article__image"
          width={140}
          height={170}
        />
      )}
      <div className="article__description">
        <h6>{`${title}`}</h6>
        <div>
          <MarkdownView
            markdown={`${summary}`}
            dangerouslySetInnerHTML={{ __html: summary }} />
          {/* <ReactMarkdown source={`${summary} ...`} /> */}
        </div>
        <div className="article__link">
          <Link to={slug}>
            <small>{text}</small>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogArticle
