import React, { useEffect, useRef, useState } from "react"
import ButtonLink from "../ButtonLink/ButtonLink"
import "./videoBackground.scss"
import PropTypes from "prop-types"

const VideoBackground = ({ data }) => {

  const { video, description, button, strapi_component, id, backgroundImage, videoUrl } = data;
  const [isVideoPause, setIsVideoPause] = useState(false)
  const videoRef = useRef(null)

  const pausePlay = () => {
    if (isVideoPause) {
      videoRef?.current?.play()
    } else {
      videoRef?.current?.pause()
    }
    setIsVideoPause(prev => !prev)
  }

  useEffect(() => {
    const isVideoPauseLocal =
      typeof window !== "undefined"
        ? localStorage.getItem("videoPaused")
        : undefined

    if (isVideoPauseLocal === "true") {
      videoRef?.current?.pause()
      setIsVideoPause(isVideoPauseLocal)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("videoPaused", isVideoPause)
  }, [isVideoPause])

  const url = videoUrl?.replace("watch?v=", "embed/")
  let code = url?.substring(url.lastIndexOf("/") + 1, url.length)
  const codeIndex = code?.indexOf("?")

  if (codeIndex !== -1 && code !== undefined) {
    code = code.substring(0, code.indexOf("?"))
  }

  return (
    <div
      //className={`${backgroundImage && "pt-1 pb-1"}`}
      style={{
        backgroundImage: `url(${backgroundImage?.url})`, backgroundRepeatY: 'no-repeat', backgroundPosition: "center"
      }}
    >
      <div
        className="container px-md-0 px-lg-0 videoBackground-container"
        id={strapi_component + "-" + id}
      >
        <section
          className="videoBackground"
        //style={{ marginTop: backgroundImage && 30 }}
        >
          {(video?.url !== null && video?.url !== undefined) ? (
            <video
              className="video"
              ref={videoRef}
              muted
              autoPlay
              loop
              src={video.url}
              type="video/mp4"
              controls={false}
              onClick={pausePlay}
            />
          ) : (videoUrl !== null && videoUrl !== undefined) && (
            <>
              {(url !== undefined && code !== undefined) && (
                <iframe
                  className="video"
                  loading="lazy"
                  type="text/html"
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;
                    width:100%;height:100%;object-fit: cover;top:0;bottom:0}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;margin:auto;text-shadow:0 0 0.5em black}</style>
                    <a href=${url + "?rel=0"}>
                    <img src=https://img.youtube.com/vi/${code}/hqdefault.jpg alt='Video' height='100%'>
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
            </>
          )}

          {description &&
            <div className="videoBackground-card">
              <h5>{description}</h5>
              {button && (
                <button className="px-4">
                  <ButtonLink
                    button={button}
                    aria-label={`View ${button?.content}`}
                  />
                </button>
              )}
            </div>
          }
        </section>
      </div>
    </div>
  )
}

VideoBackground.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    videoUrl: PropTypes.string,
    description: PropTypes.string,
    strapi_component: PropTypes.string,
    backgroundImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    video: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    button: PropTypes.shape({
      content: PropTypes.string.isRequired,
    })
  })
}

export default VideoBackground
