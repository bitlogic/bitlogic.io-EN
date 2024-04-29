import { Link } from "gatsby"
import React from "react"
import "./dropdown.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useLandingUrl } from "../../../../hooks"

const Dropdown = ({ sections, topLevel }) => {

  const getUrl = useLandingUrl()

  const url = (item) => {
    const landing = getUrl(item?.english_landing_page?.slug);

    if (landing) return landing

    const slug = item?.url ? item.url : ''

    return slug
  }

  return (
    <div className="dropdown_elem" style={!sections ? { maxHeight: "0" } : {}}>
      <div className="dropdown_elem-section" data-first-dropdown-section>
        {topLevel && (
          <div className="dropdown_elem_topLevel">
            <div className="dropdown_elem-link" style={{ borderBottom: "2px solid #808080", paddingBottom: "15px" }}>
                <GatsbyImage
                  image={getImage(topLevel.icon.localfile?.childrenImageSharp[0].gatsbyImageData)}
                  alt={topLevel.icon.alternativeText ? topLevel.icon.alternativeText : 'NavLink Icon'}
                />
              <Link
                to={url(topLevel)}
                state={{ component: topLevel.id }}
                className="dropdown_elem-link-inner"
              >
                {topLevel.label}
              </Link>
            </div>
            {topLevel?.text ? <p>{topLevel.text}</p> : ''}
          </div>
        )}
        <div className="dropdown_section">
          {sections?.map(section =>
            <>
              <div className="dropdown_elem-link" key={section.id}>
                <GatsbyImage
                  image={getImage(section.icon)}
                  alt={section.icon.alternativeText ? section.icon.alternativeText : 'NavLink Icon'}
                />
                <Link
                  to={url(section)}
                  state={{ component: section.id }}
                  className="dropdown_elem-link-inner"
                >
                  {section.label}
                </Link>
              </div>
              <p>
                {section?.text ? section.text : ''}
              </p>
            </>
          )}
        </div>
      </div >
    </div>
  )
}

export default Dropdown
