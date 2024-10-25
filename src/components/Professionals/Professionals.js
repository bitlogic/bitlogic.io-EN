import React from "react"
import { useProfessionals } from "../../hooks"
import "./Professionals.scss"
import { FaLinkedinIn } from "react-icons/fa"
import PropTypes from "prop-types"
import CustomImage from "../CustomImage/CustomImage"

const Professionals = ({ data }) => {
  const { title, summary, eng_professionals } = data
  const professionalsData = useProfessionals().allStrapiProfessional?.nodes
  const professionalsList = eng_professionals
    .map(pro =>
      professionalsData?.find(professional => professional.strapiId === pro.id)
    )
    .slice(0, 6)

  const professionalsCards = professionalsList.map(pro => {
    if (!pro) return null;
    const { name, position, quote, linkedin, photo } = pro

    return (
      <div className="pro col-12 col-md-4 row" key={`pro-${pro.id}`}>
        <div className="col-6 col-md-12">
          {photo && (
            <CustomImage
              image={photo}
              alt={photo?.alternativeText || name}
              width={160}
              height={250}
              className="pro__img"
            />
          )}
        </div>
        <div className="col-6 col-md-12">
          <div className="pro__descr">
            <h3 className="pro__descr_title">{name}</h3>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="External Link - LinkedIn Profile"
              >
                <FaLinkedinIn size={23} />
              </a>
            )}
            {position && <h3 className="pro__descr_position">{position}</h3>}
            <p className="pro__descr_text">{quote}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="container pt-5 pb-1 prosSection">
      {title && <h2>{title}</h2>}
      {summary && <h3 className="prosSection__summary px-lg-3">{summary}</h3>}
      {professionalsCards !== undefined && professionalsCards.length > 0 && (
        <div className="cases row">{professionalsCards}</div>
      )}
    </div>
  )
}

Professionals.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    eng_professionals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        position: PropTypes.string,
        quote: PropTypes.string,
        linkedin: PropTypes.string,
        photo: PropTypes.shape({
          alternativeText: PropTypes.string,
        }),
      })
    ),
  }),
}

export default Professionals
