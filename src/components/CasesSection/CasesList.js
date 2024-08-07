import React from "react"
import MarkdownView from "react-showdown"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useCases } from "../../hooks/index"
import "./CasesSection.scss"
import PropTypes from 'prop-types'
//import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"

const CasesList = ({data}) => {
  const title = data.title;
  const casesData = useCases()
  const cases = casesData?.allStrapiCase?.nodes

  const expendedCards = cases.map(caso => {
    const image = getImage(caso.image?.localFile)
    const profileImg = getImage(caso.quote?.profile?.localFile)

    return (
      <div className="col-12 row caseExpanded my-3" id={caso.title} key={`${caso.title}-${caso.strapiId}`}>
        <div className="col-12">
          {image && (
            <GatsbyImage image={image}
              className="caseExpanded__img"
              alt={caso.image.alternativeText
                ? caso.image.alternativeText
                : `${caso.title}-${caso.strapiId}`
              }
            />
          )}
        </div>
        <div className="col-12 ">
          {caso.title && (
            <h5 className="pt-3 pb-2 caseExpanded__title">{caso.title}</h5>
          )}

          {caso.subtitle && (
            <h6 className="caseExpanded__subtitle">{caso.subtitle}</h6>
          )}
          <div className="caseExpanded__descr">
            <MarkdownView markdown={caso.description}
              dangerouslySetInnerHTML={{ __html: caso.description }} />
          </div>
        </div>
        <div className="col-12 row caseQuote">
          <h5 className="caseQuote__title col-12 pt-md-3 pb-2">
            {caso.quote.title}
          </h5>
          <p className="caseQuote__descr col-9 col-md-12">
            "{caso.quote.description}"
          </p>
          {profileImg && (
            <GatsbyImage
              image={profileImg}
              alt={caso.quote?.profile?.alternativeText
                ? caso.quote?.profile?.alternativeText
                : `${caso.quote?.title}-${caso.strapiId}`
              }
              className="ml-md-3 caseQuote__profileImg col-3 col-md-12"
            />
          )}
        </div>
        
        
      </div>
    )
  })
  return (
    <div className="container py-5 casesSection">
       <div className="case__descr">
      <h2 className="case__descr_title">{title}</h2>
      </div>
      <div className="row">{expendedCards}</div>
    </div>
  )
}

CasesList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired
  })
}

export default CasesList
