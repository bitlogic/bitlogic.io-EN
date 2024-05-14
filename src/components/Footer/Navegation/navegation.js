import React from "react"
import { useLandingUrl } from "../../../hooks"
import { Link } from "gatsby"
import "./navegation.scss"

export default function Navegation({ navegation, navbarItem }) {
  const getUrl = useLandingUrl()

  const navbarItems = navbarItem?.map((navItem, index) => {

    const url = navItem.singleType ? '/' + navItem.singleType :
      navItem.landing ? getUrl(navItem?.landing?.slug) :
        `${navItem.url ? navItem.url : ''}`

    return (
      <li className="mb-2" key={`${navItem.label}-${index}`} >
        <Link to={url}>{navItem.label}</Link>
      </li >
    )
  })

  return (
    <div className="ContactData__Item ps-md-3">
      <h6>{navegation?.title}</h6>
      <ul className="Navegation__Item">
        {navbarItems}
      </ul>
    </div>
  )
}
