import React from "react"
import { useLandingUrl } from "../../../hooks"
import { Link } from "gatsby"
import "./navegation.scss"
import PropTypes from "prop-types"

export default function Navegation({ navegation, navbarItem }) {
  const getUrl = useLandingUrl()

  const navbarItems = navbarItem?.map((navItem, index) => {

    let url;

    if(navItem.singleType){
      url = '/' + navItem.singleType;
    }else if(navItem.landing){
      url = getUrl(navItem?.landing?.slug);
    }else if(navItem.url){
      url = navItem.url;
    }else{
      url = '';
    }

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

Navegation.propTypes = {
  navegation: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  navbarItem: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string.isRequired,
      singleType: PropTypes.string,
      landing: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      })
    })
  ).isRequired
}