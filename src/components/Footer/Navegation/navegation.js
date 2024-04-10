import React from "react"
import { useFooter, useLandingUrl } from "../../../hooks"
import { Link } from "gatsby"
import "./navegation.scss"

export default function Navegation() {
  const data = useFooter()?.allStrapiLayout?.nodes[0]
  const dataFooter = data?.footer
  const dataNav = data?.navbar
  const getUrl = useLandingUrl()

  const navbarItems = dataNav.navbarItem.map((navItem) => {

    const url = navItem.singleType ? '/' + navItem.singleType :
      navItem.landing ? getUrl(navItem?.landing?.slug) :
        `${navItem.url ? navItem.url : ''}`

    return (
      < li className="mb-2" >
        <Link to={url}>{navItem.label}</Link>
      </li >
    )
  })

  return (
    <div className="ContactData__Item ps-md-3">
      <h6>{dataFooter.navegation?.title}</h6>
      <ul className="Navegation__Item">
        {navbarItems}
      </ul>
    </div>
  )
}
