module.exports = {
  siteMetadata: {
    title: 'Bitlogic | End-to-end software development',
    description: `Bitlogic Web is a company dedicated to the design, engineering, and agile development of software products, specializing in the digital transformation of educational institutions.`,
    author: `Bitlogic.io`,
    siteUrl: process.env.SITE_URL,    
    // siteUrl: 'https://bitlogic.io',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/',
        query: `
        {
          allSitePage {
            nodes {
              path
              pageContext
            }
          }
          strapiEnglishBlogPage {
            updated_at
          }
          strapiEnglishHome {
            updated_at
          }
        }
        `,
        resolveSiteUrl: () => process.env.SITE_URL,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          strapiEnglishBlogPage: blogPage,
          strapiEnglishHome: homePage,
        }) => {
          const singlePages = [
            {
              path: "/",
              lastmod: homePage.updated_at,
            },
            {
              path: "/blog",
              lastmod: blogPage.updated_at,
            },
          ]

          return allPages.map(page => {
            if (page.path === "/") return singlePages[0]
            else if (page.path === "/blog/") return singlePages[1]

            return {
              path: page.path,
              lastmod: page?.pageContext?.lastmod,
            }
          })
        },
        serialize: ({ path, lastmod }) => {
          return {
            url: path,
            lastmod: lastmod,
          }
        },
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap-index.xml`,
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-F6VPYEJ1X0"],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
          cookie_flags: "SamSite=None; Secure"
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          respectDNT: true,
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
        siteUrl: process.env.SITE_URL,
        //siteUrl: 'https://bitlogic.io',
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // apiURL: `http://lb-bitlogic-strapi-dev-48805770.sa-east-1.elb.amazonaws.com:1337`,
        //apiURL: `https://strapi.bitlogic.io`,
        apiURL: process.env.STRAPI_URL,
        //apiURL: 'http://127.0.0.1:1337',
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
