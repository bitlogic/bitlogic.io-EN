import React from "react"
import MarkdownView from "react-showdown"
import "./Text.scss"

export default function Text({ data }) {
  const title = data?.title
  const description = data?.text
  const bgImage = data?.backgroundImage?.url

  return (
    <div className="container-text mt-3 mt-xl-5" style={{
      backgroundImage: `url(${bgImage})`,
    }}>
      
      {title !== "" && title !== undefined && title !== null ? (
        <div className="container text d-flex flex-column flex-md-row gap-xl-5">
          <div className="title">
            <h2 className="titleText pt-5 ps-md-0 pt-md-3">{title}</h2>
          </div>
          <div  className="description">
          <MarkdownView
            markdown={description}
            dangerouslySetInnerHTML={{ __html: description }}
            style={{margin: !bgImage && '0rem'}}
          />
          </div>
        </div>
      ) : (
        <div className="container container-markdown" style={{padding: !bgImage && '0rem'}}>
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
