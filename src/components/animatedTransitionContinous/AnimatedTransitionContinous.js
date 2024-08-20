import React from "react"
import "./animatedTransitionContinous.scss"
import PropTypes from "prop-types"

const AnimatedTransitionContinous = ({
  data: { text = "", image, imagePosition, color },
}) => {
  let longerText = ""

  const amount = text ? 200 : 50
  while (longerText.length < amount) {
    longerText = (text || "") + "-" + longerText
  }

  return (
    <div className="m-scroll">
      <div className="m-scroll__title">
        <div className={text ? "" : "m-scroll__title-image"}>
          {longerText.split("-").map((innerText, index) => (
            <div className="m-scroll__title-inner" key={index}>
              {imagePosition === "first" && image && (
                <img src={image?.url}
                  alt={image?.alternativeText
                    ? image.alternativeText
                    : 'Transition-Image'}
                  width={60}
                  height={60}
                  loading="lazy"
                />
              )}
              <h1 style={{ color: color }}>{innerText || ""}</h1>
              {(imagePosition === "last" || !imagePosition) && image && (
                <img src={image?.url}
                  alt={image?.alternativeText
                    ? image.alternativeText
                    : 'Transition-Image'}
                  width={60}
                  height={60}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
AnimatedTransitionContinous.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    imagePosition: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string,
    })
  })
}

export default AnimatedTransitionContinous
