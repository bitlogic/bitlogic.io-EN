import { Link } from "gatsby"
import React from "react"
import { useLandingUrl } from '../../hooks'

const ButtonLink = ({ button }) => {
  const getUrl = useLandingUrl()
  let internal = ""
  if (!button) return null
  if (button?.landing_page) internal = getUrl(button.landing_page.slug)
  else if (button?.singleType) internal = "/" + button.singleType

  if (internal) return <Link to={internal} aria-label={`Navigate to ${button.content}`} >{button.content}</Link>
  else return <a href={button?.url} target="_blank" rel="noreferrer" aria-label="External Link">{button.content}</a>
}

export default ButtonLink
