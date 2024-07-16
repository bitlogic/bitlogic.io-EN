import React from "react"
import { useTheme } from "../../context/themeContext"
import MarkdownView from "react-showdown"
import CustomImage from "../CustomImage/CustomImage"
import CustomLink from "../CustomLink/CustomLink"

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
          <h4>{title}</h4>
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

export default OneSection
