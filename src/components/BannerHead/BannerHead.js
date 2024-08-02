import React from "react"
import "./BannerHead.scss"
import MarkdownView from "react-showdown"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useTheme } from "../../context/themeContext"
import PropTypes from 'prop-types'

const BannerHead = ({ data }) => {
  const { theme } = useTheme()

  const title = data?.title

  const checkImage = () => {
    if (data?.image?.url) {
      return (
        <img
          src={
            theme === "dark" && data?.imageDark
              ? data?.imageDark?.url
              : data?.image?.url
          }
          alt={data?.image?.name}
        />
      )
    } else {
      const image = getImage(data?.image?.localFile)
      const imageDark = data?.imageDark && getImage(data?.imageDark?.localFile)
      return (
        <GatsbyImage
          image={theme === "dark" && imageDark ? imageDark : image}
          alt={`img-${title}`}
        ></GatsbyImage>
      )
    }
  }

  return (
    <div className="banner d-flex justify-content-center">
      <div className="banner__image">{checkImage()}</div>
      {title && <MarkdownView markdown={title}  dangerouslySetInnerHTML={{ __html: title }}/>}
    </div>
  )
}

BannerHead.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
      localFile: PropTypes.object,
    }),
    imageDark: PropTypes.shape({
      url: PropTypes.string,
      localFile: PropTypes.object,
    })
  })

}

export default BannerHead
