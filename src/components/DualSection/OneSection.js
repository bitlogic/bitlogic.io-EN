import React from "react"
import { useTheme } from "../../context/themeContext"
import ButtonLink from "../ButtonLink/ButtonLink"
import MarkdownView from "react-showdown"

const OneSection = ({ data: { id, strapi_component, dualSectionPart } }) => {
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
        backgroundImage: `url(${theme === "dark" && backgroundImageDark?.url
          ? backgroundImageDark?.url
          : backgroundImage?.url
          })`,
        backgroundPosition: 'center'
      }}
    >
      <div className="container one_sec" id={strapi_component + "-" + id}>
        <div className="one_sec-title">
          <h4>{title}</h4>
          <div className="one_sec-title-body">
            <MarkdownView
              markdown={description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <button className="NavBar_Side-contact">
            <ButtonLink
              aria-label={`Navigate to ${button.content}`}
              button={button}
            />
          </button>
        </div>
        <div className="one_sec-img">
          <img src={image?.url}
            alt={image?.alternativeText
              ? image.alternativeText
              : `${title}`
            }
            width={290}
            height={180}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default OneSection
