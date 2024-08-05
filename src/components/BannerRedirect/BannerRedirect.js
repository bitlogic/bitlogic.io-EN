import React, { useState, useEffect } from "react"
import "./BannerRedirect.scss"
import { MdClose } from "react-icons/md"

function BannerRedirect() {
  const [isOpen, setIsOpen] = useState(true)

  const REDIRECT = Object.freeze({
    title: `¿Te gustaría visitar nuestro sitio en español?`,
    url: "https://es.bitlogic.io",
    callToAction: "Vamos!",
  })

  const closeBanner = () => {
    setIsOpen(false)

    if (typeof window !== "undefined") {
      localStorage.setItem("BannerRedirect", "closed")
    }
  }

  const userLanguage = typeof window !== "undefined" ? navigator?.language : ""

  useEffect(() => {
    if (userLanguage?.startsWith("en")) {
      closeBanner()
    }
  }, [userLanguage])

  const bannerStorage =
    typeof window !== "undefined"
      ? localStorage.getItem("BannerRedirect")
      : undefined

  if (bannerStorage === "closed" || !isOpen) return null

  return (
    <section className="BannerRedirect container">
      <div className="BannerRedirect__wrapper">
        <div className="d-flex flex-direction-row">
          <h6>{REDIRECT.title}</h6>
          <button aria-label="Close Banner" onClick={() => closeBanner()}>
            <MdClose />
          </button>
        </div>
        <button
          className="BannerRedirect__wrapper__btn"
          onClick={() => closeBanner()}
        >
          <a href={REDIRECT.url}>{REDIRECT.callToAction}</a>
        </button>
      </div>
    </section>
  )
}

export default BannerRedirect
