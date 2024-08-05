import "./logosSection.scss"
import React from "react"
import { useTheme } from "../../context/themeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const CustomLeftArrow = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      role="button"
      aria-label="Left arrow to see the previous logo"
      tabIndex={0}
      aria-hidden={false}
      focusable
      onKeyDown={event => handleKeyDown(event, onClick())}
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left custom-arrow left"
      icon="fa-solid fa-chevron-left"
      onClick={() => onClick()}
    />
  )
}
const CustomRightArrow = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      role="button"
      aria-label="Right arrow to see the previous logo"
      tabIndex={0}
      aria-hidden={false}
      focusable
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right custom-arrow right"
      icon="fa-solid fa-chevron-right"
      onClick={() => onClick()}
    />
  )
}

const LogosSection = ({ data }) => {
  const { title, summary, media } = data
  const { theme } = useTheme()
  const logoList = media.map(logo => {
    return (
      <div className="logos__image" key={`${logo.name}-${logo.id}`}>
        <img
          src={
            theme === "dark" && logo?.imageDark
              ? logo?.imageDark?.url
              : logo?.img?.url
          }
          alt={logo.name}
          width={196}
          height={186}
        />
      </div>
    )
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobileTablet: {
      breakpoint: { max: 767, min: 577 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  }

  return (
    <div
      className="logos container py-3 my-3"
      id={data.strapi_component + "-" + data.id}
    >
      {title && <h2 className="logos__title">{title}</h2>}
      {summary && <h6 className="logos__summary px-lg-3">{summary}</h6>}

      <Carousel
        responsive={responsive}
        autoPlay={logoList.length > 4}
        autoPlaySpeed={3000}
        infinite={logoList.length > 4}
        containerClass={`containerCarrusel ${
          media.length === 0 && "containerCarrusel-inactive"
        }`}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        removeArrowOnDeviceType={logoList.length <= 4 && ["tablet", "desktop"]}
      >
        {logoList}
      </Carousel>
    </div>
  )
}

export default LogosSection
