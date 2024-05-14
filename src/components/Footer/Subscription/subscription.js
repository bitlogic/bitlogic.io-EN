import { Link } from "gatsby"
import React from "react"
import { useLandingUrl } from "../../../hooks"
import "./subscription.scss"

export default function Subscription({ subscription }) {
  const getUrl = useLandingUrl()

  if (!subscription.landing) return <></>

  return (
    <div className="ContactData__Item contactData-container">
      <h6 className="titleSubscription">{subscription?.title}</h6>
      <div>
        <div className="ContactData__Form d-flex flex-md-column justify-content-between">
          <button className="col-5">
            <Link to={getUrl(subscription?.landing?.slug)}>{subscription?.callToAction}</Link>
          </button>
        </div>
      </div>
      <button className="col-5 contactData-mobile_button">
        <Link to={getUrl(subscription?.landing?.slug)} >{subscription?.title}</Link>
      </button>
    </div>
  )
}
