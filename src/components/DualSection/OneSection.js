import React from "react"
import { useTheme } from "../../context/themeContext"
import MarkdownView from "react-showdown"
import CustomImage from "../CustomImage/CustomImage"
import CustomLink from "../CustomLink/CustomLink"
import PropTypes from "prop-types"

const OneSection = ({ data: { dualSectionPart } }) => {
  const { theme } = useTheme()
  const {
    title,
    button,
    description,
    image,
    backgroundImage,
    backgroundImageDark,
  } = dualSectionPart ? dualSectionPart[0] : {}
  return (
    <div
      className="one_sec-background"
      style={{
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${
          theme === "dark" && backgroundImageDark?.url
            ? backgroundImageDark?.url
            : backgroundImage?.url
        })`,
      }}
    >
      <div className="container one_sec">
        <div className="one_sec-title">
          <h2>{title}</h2>
          <div className="one_sec-title-body">
            <MarkdownView
              markdown={description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          {button && (
            <CustomLink
              content={button.content}
              url={button?.url}
              landing={button?.english_landing_page}
              className=""
            />
          )}
        </div>
        <div className="one_sec-img">
          <CustomImage
            image={image}
            width={290}
            height={180}
            alt={image?.alternativeText || title}
            className=""
          />
        </div>
      </div>
    </div>
  )
}

OneSection.propTypes = {
  data: PropTypes.shape({
    dualSectionPart: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.shape({
          url: PropTypes.string.isRequired,
          alternativeText: PropTypes.string,
        }).isRequired,
        button: PropTypes.shape({
          content: PropTypes.string.isRequired,
          url: PropTypes.string,
          english_landing_page: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
        backgroundImage: PropTypes.shape({
          url: PropTypes.string,
        }),
        backgroundImageDark: PropTypes.shape({
          url: PropTypes.string,
        }),
      })
    ),
  }),
}

export default OneSection
