import React from "react"
import MarkdownView from "react-showdown"
import "./Text.scss"
import PropTypes from "prop-types"

export default function Text({ data }) {
  const title = data?.title
  const description = data?.text
  const bgImage = data?.backgroundImage?.url

  return (
    <div
      className="container-text"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
      }}
    >
      {title !== "" && title !== undefined && title !== null ? (
        <div className="container text d-flex flex-column flex-lg-row gap-3 gap-xl-5">
          <div className="title">
            <h2 className="titleText">{title}</h2>
          </div>
          <div className="description">
            <MarkdownView
              markdown={description}
              dangerouslySetInnerHTML={{ __html: description }}
              style={{ margin: !bgImage && "0rem" }}
            />
          </div>
        </div>
      ) : (
        <div
          className="container container-markdown"
          style={{ padding: !bgImage && "0rem" }}
        >
          <div className="notTitle">
            <MarkdownView
              markdown={description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

Text.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    backgroundImage: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}
