import "./quote.scss"
import MarkdownView from "react-showdown"
import React from "react"
import { useLandingUrl } from "../../hooks"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const Quote = ({
  data: { description, title, variant, profileDescription, videoUrl, button, profile, image, strapi_component, id },
}) => {
  // console.log(button.url.startsWith('http'))

  const getUrl = useLandingUrl()
  const url = videoUrl?.replace("watch?v=", "embed/")
  let code = url?.substring(url.lastIndexOf("/") + 1, url.length)
  const codeIndex = code?.indexOf("?")

  if (codeIndex !== -1 && code !== undefined) {
    code = code.substring(0, code.indexOf("?"))
  }

  return (
    <div className="container mb-3 mb-lg-5" id={strapi_component + "-" + id}>
      <section className={`quote variant-${variant} py-lg-4`}>
        {(image && !videoUrl) && (
          <div className="quote-body">
            <img
              src={image.url}
              alt={image?.alternativeText
                ? image.alternativeText
                : title
              }
              loading="lazy"
              width={290}
              height={360}
            />
          </div>
        )}

        {(videoUrl !== null && videoUrl !== undefined) && (
          <div className="quote-body">
            {(url !== undefined && code !== undefined) && (
              <iframe
                loading="lazy"
                type="text/html"
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;
                width:100%;height:100%;object-fit: cover;top:0;bottom:0;max-height: 500px}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;margin:auto;text-shadow:0 0 0.5em black}</style>
                <a href=${url + "?rel=0"}>
                <img src=https://img.youtube.com/vi/${code}/hqdefault.jpg alt='Video'>
                <span>▶</span></a>`}
                src={url + "?rel=0"}
                frameBorder="0"
                allowFullScreen
                title="benefits_video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
              ></iframe>
            )}
          </div>
        )}

        <div className="quote-person">
          <h4 className="quote-person-title">{title}</h4>
          <MarkdownView markdown={description} className="quote-person-text"
            dangerouslySetInnerHTML={{ __html: description }} />

          {profile && (
            <div className="quote-profile make-it-fast my-3 my-md-2 my-xl-4 d-flex gap-3 justify-content-between">
              <img src={profile?.url}
                loading="lazy"
                alt={profile?.alternativeText
                  ? profile.alternativeText
                  : `quote author`
                }
                width={70}
                height={70}
              />
              <div className="flex-grow-1 align-self-center">
                <MarkdownView markdown={profileDescription} className="markdown"
                  dangerouslySetInnerHTML={{ __html: profileDescription }} />
              </div>
            </div>
          )}
          {button && (
            <div className="quote-btn">
              {button?.english_landing_page ? (
                <Link to={getUrl(button.english_landing_page.slug)}>
                  {button.content}
                </Link>
              ) : (
                <a href={button.url}
                  target={button.url.startsWith('http') ? '_blank' : ''}
                  rel={button.url.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <button>{button.content}</button>
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

Quote.defaultProps = {
  description: "",
  title: "",
  variant: "",
  profileDescription: "",
  videoUrl: "",
  button: {},
  profile: {},
  image: {},
}

Quote.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    variant: PropTypes.string,
    profileDescription: PropTypes.string,
    videoUrl: PropTypes.string,
    strapi_component: PropTypes.string,
    id: PropTypes.string,
    button: PropTypes.shape({
      content: PropTypes.string.isRequired,
      english_landing_page: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }),
      url: PropTypes.string,
    }),
    profile: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string,
    }),
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string,
    })
  }).isRequired
}

export default Quote
