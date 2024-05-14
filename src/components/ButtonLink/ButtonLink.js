import { Link } from "gatsby"
import React from "react"
import { useLandingUrl } from '../../hooks'

const ButtonLink = ({ button }) => {
  const getUrl = useLandingUrl()
  let internal = ""
  if (!button) return null

  if (button?.english_landing_page) internal = getUrl(button.english_landing_page.slug)

  if (internal) return (
    <Link to={internal}
      aria-label={`Navigate to ${button.content}`}
    >
      {button.content}
    </Link>
  )

  return (
    <a href={button?.url}
      target="_blank"
      rel="noreferrer"
      aria-label="External Link"
    >
      {button.content}
    </a>
  )
}

export default ButtonLink
