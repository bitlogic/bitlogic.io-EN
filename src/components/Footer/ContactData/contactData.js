import { Link } from "gatsby"
import React from "react"
import { useLandingUrl } from "../../../hooks"
import FaIcon from "../../FaIcon/FaIcon"
import "./contactData.scss"

export default function ContactData({ contact, navButton, internalLink }) {
  const getUrl = useLandingUrl()

  const contactItems = contact?.iconText.map((item, index) => {
    return (
      <div className="icon-text d-flex" key={`${item.name}-${index}`}>
        <FaIcon type={item.icon.type} code={item.icon.code} />
        {item.name}
      </div>
    )
  })

  return (
    <>
      <div className="ContactData__Item">
        <h6>{contact?.title}</h6>
        <div className="ContactData__Item__contact">{contactItems}</div>

        <div className="ContactData__Item__link">
          <Link
            to={navButton.landing_page
              ? getUrl(navButton.landing_page.slug)
              : `${navButton.url ? navButton.url : ''}`
            }
          >
            {internalLink?.name}
          </Link>
        </div>
      </div>
    </>
  )
}