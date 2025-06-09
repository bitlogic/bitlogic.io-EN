import React from "react"
import { Link } from "gatsby"
// import ReactMarkdown from "react-markdown"
import MarkdownView from "react-showdown"
import "./BlogArticle.scss"
import CustomImage from "../../CustomImage/CustomImage"
import PropTypes from "prop-types"

const BlogArticle = ({ title, summary, image, slug, text }) => {


  return (
    <div className="article__container" data-nosnippet>
      <CustomImage
        image={image}
        alt={image?.alternativeText || title}
        className="article__image"
        width={140}
        height={170}
      />
      <div className="article__description">
        <h3>{`${title}`}</h3>
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

BlogArticle.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  text: PropTypes.string,
  image: PropTypes.shape({
    alternativeText: PropTypes.string,
    url: PropTypes.string,
  })
}

export default BlogArticle
