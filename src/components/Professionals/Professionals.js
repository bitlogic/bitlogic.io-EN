import React from 'react'
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useProfessionals } from '../../hooks'
import "./Professionals.scss"
import { FaLinkedinIn } from "react-icons/fa"
import PropTypes from "prop-types"

const Professionals = ({ data }) => {
  const { title, summary, eng_professionals } = data
  const professionalsData = useProfessionals().allStrapiProfessional?.nodes

  const professionalsList = eng_professionals.map(pro =>
    professionalsData?.find(professional => professional.strapiId === pro.id)
  ).slice(0, 6)

  const professionalsCards = professionalsList.map(pro => {

    const photo = pro?.photo ? getImage(pro?.photo?.localFile) : undefined

    const { name, position, quote, linkedin } = pro

    return (
      <div
        className="pro col-12 col-md-4 row"
        key={`pro-${pro.id}`}
        id={data.strapi_component + "-" + data.id}
      >
        <div className="col-6 col-md-12">
          {photo ? (
            <GatsbyImage image={photo}
              className="pro__img"
              alt={pro?.photo?.alternativeText
                ? pro.photo.alternativeText
                : name
              }
              loading='lazy'
              width={160}
              height={250}
            />
          ) : (
            <img src={pro?.photo?.url}
              className="pro__img"
              alt={pro?.photo?.alternativeText
                ? pro.photo.alternativeText
                : name
              }
              loading='lazy'
              width={160}
              height={250}
            />
          )}
        </div>
        <div className="col-6 col-md-12">
          <div className="pro__descr">
            <h6 className="pro__descr_title">{name}</h6>
            {linkedin && (
              <a href={linkedin} target="_blank" rel='noreferrer noopener' aria-label='External Link - LinkedIn Profile'>
                <FaLinkedinIn size={23} />
              </a>)
            }
            {position && <h6 className="pro__descr_position">{position}</h6>}
            <p className="pro__descr_text">{quote}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="container pt-5 pb-1 prosSection">
      {title && <h2>{title}</h2>}
      {summary && <h6 className="prosSection__summary px-lg-3">{summary}</h6>}
      {(professionalsCards !== undefined && professionalsCards.length > 0) &&
        <div className="cases row">{professionalsCards}</div>
      }
    </div>
  )
}

Professionals.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  id: PropTypes.number,
  strapi_component: PropTypes.string,
  eng_professionals: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.shape({
      localFile: PropTypes.object,
      url: PropTypes.string,
      alternativeText: PropTypes.string
    })
  })
}

export default Professionals