import React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useCases} from "../../hooks/index"
import "./CasesSection.scss"
import PropTypes from "prop-types"
import CustomLink from "../CustomLink/CustomLink"

const CasesSection = ({ data }) => {
  const { title, english_cases } = data
  const casesData = useCases()?.allStrapiCase?.nodes

  const casos = english_cases.map(caso =>
    casesData.find(ca => ca.strapiId === caso.id)
  )

  const casesCards = casos.map(caso => {
    const image = getImage(caso?.image?.localFile)

    return (
      <div key={caso.strapiId}
        className={`case col-12 row ${casos.length === 3
          ? "col-md-4"
          : "col-md-6"
          }`}

      >
        {image && (
          <div className="col-6 col-md-12">
            <GatsbyImage
              image={image}
              className="case__img"
              alt={
                caso.image?.alternativeText
                  ? caso.image.alternativeText
                  : `${caso.title}-${caso.strapiId}`
              }
              width={130}
              height={200}
            />
          </div>
        )}
        <div className="col-6 col-md-12">
          <div className="case__descr">
            <h5 className="case__descr_title">{caso?.title}</h5>
            <p className="case__descr_text">"{caso?.description}"</p>
          </div>
          {caso?.button && (
            <CustomLink
              content={caso?.button?.content}
              url={caso?.button?.url}
              landing={caso?.button?.landing_page}
              className={"button"}
            />
          )}
        </div>
      </div>
    )
  })

  return (
    <div className="container py-5 casesSection">
      {title && <h2>{title}</h2>}
      {casesCards !== undefined && casesCards.length > 0 && (
        <div className="cases row">{casesCards}</div>
      )}
    </div>
  )
}

CasesSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    english_cases: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.shape({
          alternativeText: PropTypes.string,
          url: PropTypes.string.isRequired,
          localFile: PropTypes.object,
        }).isRequired,
        button: PropTypes.shape({
          content: PropTypes.string.isRequired,
          url: PropTypes.string,
          landing_page: PropTypes.shape({
            slug: PropTypes.string.isRequired
          })
        })
      })
    )
  })
}

export default CasesSection
