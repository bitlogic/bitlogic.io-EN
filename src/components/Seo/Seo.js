import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useGlobalSeo } from "../../hooks"

function Seo({ description, lang, meta, title, keywords, location }) {
  const data = useGlobalSeo()

  const pathname = location?.pathname || "/"
  const {
    author,
    robots,
    siteMetadata: { siteDesc, siteKeywords, siteTitle },
  } = data?.allStrapiGlobalSeo?.nodes[0] || {}

  const metaDescription = description || siteDesc
  const defaultTitle = siteTitle
  const preventIndex = robots ? `index, follow` : `noindex, nofollow`
  const defaultKeywords = keywords || siteKeywords

  let titleTemplateValue = null;

  if (defaultTitle) {
    if (title?.length + defaultTitle?.length <= 50) {
      titleTemplateValue = `%s | ${defaultTitle}`; // Concatenar si la longitud total es corta
    } else {
      titleTemplateValue = `%s`; // Usar solo el título particular
    }
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplateValue}
      meta={[
        {
          name: `robots`,
          content: preventIndex,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: defaultKeywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[
        {
          rel: "alternate",
          href: `https://en.bitlogic${pathname}` 
        },
        {
          rel: "alternate",
          href: `https://www.bitlogic.io${pathname}`
        }
       
      ]}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  location: null,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  location: PropTypes.object, 
}

export default Seo
