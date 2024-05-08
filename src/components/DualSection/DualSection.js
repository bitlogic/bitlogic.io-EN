import React from "react"
import ButtonLink from "../ButtonLink/ButtonLink"
import "./DualSection.scss"

export default function DualSection({ data }) {
  const dualSectionParts = data?.dualSectionPart
  const listSectionParts = dualSectionParts.map(section => (
    <div
      key={section.id}
      className={`dualSection my-2 p-md-3 p-xl-4 ${section.length === 3
        ? "col - md - 4"
        : "col - md - 6"
        }`}
    >
      <div className="dualSection__image">
        <img src={section.image.url}
          alt={section.image.alternativeText
            ? section.image.alternativeText
            : `${section.title}`
          }
        />
      </div>

      <div className="dualSection__textContainer">
        <h4>{section.title}</h4>
        <p>{section.description}</p>
        {section.button && (
          <button className="px-4">
            <ButtonLink
              aria-label={`Navigate to ${section.button?.content}`}
              button={section.button}
            />
          </button>
        )}
      </div>
    </div>
  ))

  return (
    <div className="container py-3" id={data.strapi_component + "-" + data.id}>
      <div className="d-flex flex-column flex-md-row">{listSectionParts}</div>
    </div>
  )
}
