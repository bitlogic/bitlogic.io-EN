import React from "react"
import "./animatedTransitionContinous.scss"

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
              {imagePosition === "first" && (
                <img src={image?.url}
                  alt={image?.alternativeText
                    ? image.alternativeText
                    : 'Transition-Image'}
                />
              )}
              <h1 style={{ color: color }}>{innerText || ""}</h1>
              {(imagePosition === "last" || !imagePosition) && (
                <img src={image?.url}
                  alt={image?.alternativeText
                    ? image.alternativeText
                    : 'Transition-Image'}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedTransitionContinous
