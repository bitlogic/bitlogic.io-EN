module.exports = {
  siteMetadata: {
    title: `Bitlogic`,
    description: `Bitlogic Web es una empresa dedicada al diseño, ingeniería y desarrollo ágil de productos de software, especializada en la transformación digital de instituciones educativas .`,
    author: `Bitlogic.io`,
    //siteUrl: process.env.SITE_URL,    
    title: 'Bitlogic | Desarrollo de software end to end',
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/',
      }
    },
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
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => process.env.SITE_URL,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap-index.xml`,
        policy: [{userAgent: '*', allow: '/'}]
      }
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
        // apiURL: 'http://127.0.0.1:1337',
        queryLimit: 1000,
        collectionTypes: [
          `english-article`,
          `english-blog-category`,
          `english-landing-page`,
          `english-case`,
          `english-professional`,
          `icon`
        ],
        singleTypes: [
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
  ],
}
