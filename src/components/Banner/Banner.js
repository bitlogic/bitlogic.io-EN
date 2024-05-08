import React from "react"
import { Link } from "gatsby"
import MarkdownView from "react-showdown"
//import ReactMarkdown from "react-markdown"
import Lottie from 'react-lottie'
import { useTheme } from "../../context/themeContext"
import { useLandingUrl } from '../../hooks'
import "./Banner.scss"

const Banner = ({ data }) => {
  const { theme } = useTheme()
  const { title, variant, summary, animation, image, imageDark, button } = data
  const getUrl = useLandingUrl()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  }

  const Button = ({ button }) => {
    if (button?.english_landing_page) {
      return (
        <Link
          className="button"
          araa-label={`Navigate to ${button.content}`}
          to={getUrl(button.english_landing_page.slug)}
        >
          {button?.content}
        </Link>
      )
    } else if (button?.url) {
      if (button.url?.startsWith('https')) {
        return (
          <a href={button.url}
            target="_blank"
            rel="noreferrer"
            className="button"
            aria-label="External Link"
          >
            {button?.content}
          </a>
        )
      } else {
        return (
          <a
            href={button.url}
            className="button"
            aria-label={`Navigate to ${button.content}`}
          >
            {button?.content}
          </a>
        )
      }
    }

    return null
  };

  const showTitle = () => {
    if (variant === "hero") {
      return <h1>{title}</h1>
    } else {
      return <h2>{title}</h2>
    }
  }

  return (
    <div
      className={`banner ${variant}`}
      id={data?.strapi_component + "-" + data?.id}
    >
      <div className="container banner__wrapper">
        {variant === "background" ?
          <div
            className="bgImage"
            style={{
              backgroundImage: `url(${image?.url})`,
              backgroundPosition: 'center',
              // backgroundSize: 'cover',
            }}>
            <div className="title-background ">
              <h1 style={{ color: theme === 'dark' ? 'white' : '#3F6BE8' }}>{title}</h1>
              {<MarkdownView
                markdown={summary}
                dangerouslySetInnerHTML={{ __html: summary }}
              />}
              <Button button={button} />
            </div>
          </div> :
          <>
            <div className="title container-md">
              <div>
                {/* {variant === "hero" ? <h1>{title}</h1> : <h2>{title}</h2>} */}
                {showTitle()}
                {<MarkdownView
                  markdown={summary}
                  dangerouslySetInnerHTML={{ __html: summary }}
                />}
                {/* <ReactMarkdown source={summary} className="banner-markdown" />*/}
                <Button button={button} />
              </div>
            </div>

            <div className={`imagen`}>
              {/* <img src={image?.url} alt={title} /> */}

              {image?.url ?
                <img
                  src={theme === "dark" && imageDark ? imageDark?.url : image?.url}
                  alt={image?.alternativeText
                    ? image.alternativeText
                    : title
                  }
                /> :
                <div className="cont-lottie">
                  {animation && <Lottie options={{
                    ...defaultOptions,
                    animationData: animation,
                  }}
                  />}
                </div>
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Banner
