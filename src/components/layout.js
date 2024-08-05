import React, { lazy, Suspense } from "react"
import Header from "./header"
import ThemeProvider from "../context/themeContext"
<<<<<<< HEAD
import BannerRedirect from "./BannerRedirect/BannerRedirect"
import { Helmet } from 'react-helmet';
import PropTypes from "prop-types"
=======
import Footer from "./Footer/Footer"
import "./layout.scss"
import PropTypes from "prop-types"
import "./FontAwesomeOne/FontAwesomeOne"

const BannerRedirect = lazy(() => import("./BannerRedirect/BannerRedirect"))
>>>>>>> 331b9fa81e14201d7cf5890dabc42f45354405f2

const Layout = ({ children, options = {}, location }) => {
  const defaultOptions = {
    hasHeader: true,
    hasFooter: true,
  }

  options = { ...defaultOptions, ...options }

  React.useEffect(() => {
    const hash = location?.state?.component
    let el = hash && document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [location?.state?.component])

  const userLanguage =
    typeof window !== "undefined" ? navigator.language : undefined

  return (
    <ThemeProvider>
      {options.hasHeader && <Header />}
      {userLanguage?.startsWith("es") && (
        <Suspense fallback>
          <BannerRedirect />
        </Suspense>
      )}
      <main>{children}</main>
      {options.hasFooter && <Footer />}
      {/*© {new Date().getFullYear()}, Built with*/}
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.object,
  location: PropTypes.shape({
    state: PropTypes.shape({
<<<<<<< HEAD
      component: PropTypes.number
    })
  })
=======
      component: PropTypes.string,
    }),
  }),
>>>>>>> 331b9fa81e14201d7cf5890dabc42f45354405f2
}

export default Layout
