import React from "react"
import MarkdownView from "react-showdown"
//import ReactMarkdown from "react-markdown"
import Lottie from "react-lottie"
import { useTheme } from "../../context/themeContext"
import "./Banner.scss"
import PropTypes from "prop-types"
import CustomLink from "../CustomLink/CustomLink"
import CustomImage from "../CustomImage/CustomImage"

const Banner = ({ data }) => {
  const { theme } = useTheme()
  const { title, variant, summary, animation, image, imageDark, button } = data

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const showTitle = () => {
    if (variant === "diagonal" || variant === "diagonalReverse") {
      return <h2>{title}</h2>
    }

    return <h1>{title}</h1>
  }

  return (
    <div className={`banner ${variant}`}>
      <div className="container banner__wrapper">
        <>
          <div className="title container-md">
            <div>
              {/* {variant === "hero" ? <h1>{title}</h1> : <h2>{title}</h2>} */}
              {showTitle()}
              {
                <MarkdownView
                  markdown={summary}
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              }
              <CustomLink
                content={button?.content}
                url={button?.url}
                landing={button?.english_landing_page}
                className={"button"}
              />
            </div>
          </div>

          <div className="imagen">
            {image ? (
              <CustomImage
                image={theme === "dark" && imageDark ? imageDark : image}
                width={290}
                height={200}
                alt={image?.alternativeText || title}
              />
            ) : (
              <div className="cont-lottie">
                {animation && (
                  <Lottie
                    options={{
                      ...defaultOptions,
                      animationData: animation,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  )
}

Banner.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    summary: PropTypes.string,
    button: PropTypes.shape({
      content: PropTypes.string.isRequired,
      url: PropTypes.string,
      english_landing_page: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
    }),
    animation: PropTypes.object,
    image: PropTypes.shape({
      alternativeText: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired,
}

export default Banner
