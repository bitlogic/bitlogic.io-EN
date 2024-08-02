import { Link } from "gatsby"
import React from "react"
import { useLandingUrl } from "../../../hooks"
import "./subscription.scss"
import PropTypes from "prop-types"


export default function Subscription({ subscription }) {
  const getUrl = useLandingUrl()

  if (!subscription?.landing && !subscription?.url) return <></>

  const subscriptionUrl = subscription?.url
  const landing = getUrl(subscription?.landing?.slug)

  const SubscriptionLink = ({ children }) => {
    const isExternalLink = subscriptionUrl?.startsWith('http')

    if (landing) return (
      <Link to={landing}>
        {children}
      </Link>
    )
    else if (isExternalLink) return (
      <a href={subscriptionUrl}
        rel="noopener noreferrer"
        target="_blanck"
      >
        {children}
      </a>
    )
    else {
      <a href={subscriptionUrl}>
        {children}
      </a>
    }
  }

  return (
    <div className="ContactData__Item contactData-container">
      <h6 className="titleSubscription">{subscription?.title}</h6>
      <div>
        <div className="ContactData__Form d-flex flex-md-column justify-content-between">
          <button className="col-5">
            <SubscriptionLink>{subscription?.callToAction}</SubscriptionLink>
          </button>
        </div>
      </div>
      <button className="col-5 contactData-mobile_button">
        <SubscriptionLink>{subscription?.title}</SubscriptionLink>
      </button>
    </div>
  )
}

Subscription.propTypes = {
  children: PropTypes.node,
  subscription: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    callToAction: PropTypes.string,
    landing: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    })

  })
}