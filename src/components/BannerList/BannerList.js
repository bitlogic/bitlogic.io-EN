import { Link } from "gatsby"
import React from "react"
import "./Banner.scss"
import { useLandingUrl } from "../../hooks"
import PropTypes from "prop-types"
import CustomImage from "../CustomImage/CustomImage"

export default function BannerList({ data }) {
  const { title, Card, contactForm, concactFormAnchor, callToAction } = data
  const getUrl = useLandingUrl()
  const cards = Card.map(item => {
    return (
      <div className="card_item d-flex mb-2" key={item.title}>
        {item.icon && (
          <div className="card_item">
            <CustomImage
              image={item?.icon}
              alt={item?.icon?.alternativeText || item.title}
              className={"d-block"}
              width={70}
              height={70}
            />
          </div>
        )}
        <div className="card_item col-9 pe-2">
          {item?.english_landing_page ? (
            <Link to={getUrl(item.english_landing_page.slug)}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </>
          )}
        </div>
      </div>
    )
  })

  return (
    <div className="container pt-5">
      <div className="bannerList d-md-flex flex-row">
        <h2 className="bannerList__title col-md-6 col-xl-6 align-self-center mb-4">
          {title}
          {contactForm && concactFormAnchor && callToAction && (
            <a href={concactFormAnchor}>{callToAction}</a>
          )}
        </h2>
        <div className="bannerList__cards col-md-6 col-xl-6">{cards}</div>
      </div>
    </div>
  )
}

BannerList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    strapi_component: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    contactForm: PropTypes.bool,
    concactFormAnchor: PropTypes.string,
    callToAction: PropTypes.string,
    Card: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        english_landing_page: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
        icon: PropTypes.shape({
          alternativeText: PropTypes.string,
          url: PropTypes.string.isRequired,
        }),
      })
    ),
  }),
}
