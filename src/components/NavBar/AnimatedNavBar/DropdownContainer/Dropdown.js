import { Link } from "gatsby"
import React from "react"
import "./dropdown.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useLandingUrl } from "../../../../hooks"

const Dropdown = ({ sections, topLevel }) => {

  const getUrl = useLandingUrl()

  const url = (item) => {
    const landing = getUrl(item?.english_landing_page?.slug);

    if (landing) return landing;

    const slug = item?.url ? item.url : '';

    if (slug.startsWith("http://" || "https://")) {
      return slug;
    } else {
      return { pathname: slug };
    }
  }

  return (
    <div className="dropdown_elem" style={!sections ? { maxHeight: "0" } : {}}>
      <div className="dropdown_elem-section" data-first-dropdown-section>
        {topLevel && (
          <div className="dropdown_elem_topLevel">
            <div className="dropdown_elem-link-topLevelLink">
              <GatsbyImage
                image={getImage(topLevel.icon.localFile?.childrenImageSharp[0].gatsbyImageData)}
                alt={topLevel.icon.alternativeText ? topLevel.icon.alternativeText : 'NavLink Icon'}
                className="navbarItemIcon"
              />
              {url(topLevel).startsWith("http://") ? (
                <a href={url(topLevel)} className="dropdown_elem-link-inner">{topLevel.label}</a>
              ) : (
                <Link
                  to={url(topLevel)}
                  state={{ component: topLevel.id }}
                  className="dropdown_elem-link-inner"
                >
                  {topLevel.label}
                </Link>
              )}
            </div>
            <div style={{ borderBottom: "2px solid #808080", marginBottom: "15px" }}>
              {topLevel?.text && <p className="navItemP">{topLevel.text}</p>}
            </div>
          </div>
        )}
        <div className="dropdown_section">
          {sections?.map(section =>
            <>
              <div className="dropdown_elem-link" key={section.id}>
                <GatsbyImage
                  image={getImage(section.icon.localFile?.childrenImageSharp[0].gatsbyImageData)}
                  alt={section.icon.alternativeText ? section.icon.alternativeText : 'NavLink Icon'}
                  className="navbarItemIcon"
                />
                {url(section).startsWith("http://" || "https://") ? (
                  <a href={url(section)} className="dropdown_elem-link-inner">{section.label}</a>
                ) : (
                  <Link
                    to={url(section)}
                    state={{ component: section.id }}
                    className="dropdown_elem-link-inner"
                  >
                    {section.label}
                  </Link>
                )}
              </div>
              {
                section?.text && <p>{section?.text ? section.text : ''}</p>
              }
            </>
          )}
        </div>
      </div >
    </div>
  )
}

export default Dropdown
