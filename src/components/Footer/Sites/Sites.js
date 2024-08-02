import React from "react";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import './Sites.scss'
import PropTypes from "prop-types"

const Sites = ({ sitesData }) => {

  const websitesItems = sitesData?.websites?.map(website => {
    const image = website?.icon?.localFile?.childImageSharp?.gatsbyImageData
      ? getImage(website?.icon?.localFile?.childImageSharp?.gatsbyImageData)
      : undefined;

    return (
      <div key={website.id}>
        <a href={website.url}
          aria-label={`Visita nuestro sitio web: ${website.url}`}
        >
          {image && (
            <GatsbyImage image={image}
              alt={website.icon?.alternativeText
                ? website.icon.alternativeText
                : 'Website Icon'
              }
              width={30}
              height={15}
            />
          )}
          {website?.name ? website.name : ''}
        </a>
      </div>
    )
  })

  return (
    <div className="Sites d-flex">
      {sitesData?.title && <h6>{sitesData.title}</h6>}
      <div className="Sites__items">
        {websitesItems}
      </div>
    </div>
  )
}

Sites.propTypes = {
  sitesData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    websites: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.shape({
          alternativeText: PropTypes.string,
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              gatsbyImageData: PropTypes.object.isRequired
            })
          })
        }),
      })
    )
  }).isRequired
}

export default Sites;