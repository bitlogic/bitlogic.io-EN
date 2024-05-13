import React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useCases } from "../../hooks/index"
import "./CasesSection.scss"
import { useLandingUrl } from "../../hooks/index"
import { Link } from "gatsby"

const CasesSection = ({ data }) => {
  const { title, english_cases } = data
  const casesData = useCases()
  const getUrl = useLandingUrl();

  const casos = english_cases.map(caso =>
    casesData?.allStrapiCase?.nodes.find(ca => ca.strapiId === caso.id)
  )
  const casesCards = casos.map((caso, idx) => {
    const image = getImage(caso?.image?.localFile)

    return (
      <div
        className={`case col-12 row ${casos.length === 3
          ? "col-md-4"
          : "col-md-6"
          }`}
        key={`case-${idx}`}
        id={data.strapi_component + "-" + data.id}
      >
        {image && (
          <div className="col-6 col-md-12">
            <GatsbyImage image={image}
              className="case__img"
              alt={caso.image?.alternativeText
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
            <p className="case__descr_text">"{caso?.quote?.description}"</p>
          </div>
          {caso?.button?.landing_page ? (
            <Link to={getUrl(caso.button.landing_page.slug) + `/#${caso?.title}`}>
              <button>{caso.button.content}</button>
            </Link>
          ) : (
            <a href={caso?.button?.url}
              target={caso?.button?.url?.startsWhit('http') && '_blank'}
              rel={caso?.button?.url?.startsWhit('http') && 'noreferrer noopener'}
            >
              <button>{caso.button.content}</button>
            </a>
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

export default CasesSection
