import { Link } from "gatsby"
import React from "react"
import { useLandingUrl } from '../../hooks'
import PropTypes from 'prop-types'

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

ButtonLink.propTypes = {
  button: PropTypes.shape({
    content: PropTypes.string.isRequired,
    url: PropTypes.string,
    english_landing_page: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  })
}

export default ButtonLink
