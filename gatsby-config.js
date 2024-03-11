module.exports = {
  siteMetadata: {
    title: `Bitlogic`,
    description: `Bitlogic Web es una empresa dedicada al diseño, ingeniería y desarrollo ágil de productos de software, especializada en la transformación digital de instituciones educativas .`,
    author: `Bitlogic.io`,
    //siteUrl: process.env.SITE_URL,    
    siteUrl: 'https://bitlogic.io',
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-F6VPYEJ1X0", // Google Analytics / G
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        //siteUrl: process.env.SITE_URL,
        siteUrl: 'https://bitlogic.io',
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // apiURL: `http://lb-bitlogic-strapi-dev-48805770.sa-east-1.elb.amazonaws.com:1337`,
        // apiURL: `https://strapi.bitlogic.io`,
        apiURL: process.env.STRAPI_URL,
        //apiURL: 'http://127.0.0.1:1337',
        queryLimit: 1000,
        collectionTypes: [

          `article`,
          `blog-category`,
          `landing-page`,
          `case`,
          `icon`,
          `professional`,

          `english-article`,
          `english-blog-category`,
          `english-landing-page`,
          `english-case`,
          `icon`,
          `english-professional`,
        ],
        singleTypes: [

          `global-seo`,
          `home`,
          `blog-page`,
          `global-config`,
          `layout`,

          `english-global-seo`,
          `english-home`,
          `english-blog-page`,
          `english-global-config`,
          `english-layout`,
        ],
      },
    },
    `gatsby-plugin-image`,
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          // placeholder: `blurred`,
          quality: 100,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: `src/images/isotipo.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow",
            },
          },
        ],
      },
    },
    "gatsby-plugin-offline",
    `gatsby-plugin-sass`,
    /* {
      resolve: "gatsby-plugin-hubspot",
      options: {
        trackingCode: "8668423",
        respectDNT: true,
        productionOnly: true,
      },
    }, */
  ],
}
