const landingSchema = `
type StrapiEnglishLandingPage implements Node {
    body: [BodyComponent]
    name: String
    slug: String
    parent_page: StrapiEnglishLandingPage
    published_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    created_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    updated_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    strapiId: Int
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
    seo: StrapiLandingPageSeo
  }
  
  type StrapiLandingPageSeo {
    id: Int
    pageTitle: String
    pageDescription: String
    pageKeywords: String
  }

  type BodyComponent {
    id: ID!
    title: String
    subtitle: String
    summary: String
    text: String
    description: String
    contactFormAnchor: String
    callToAction: String
    videoUrl: String
    variant: String
    imagePosition: String
    color: String
    profileDescription: String
    form_url: String
    content: String
    animation: JSON
    contactForm: Boolean
    allCases: Boolean
    allBlog: Boolean
    show: Boolean
    image: LocalFile
    imageDark: LocalFile
    backgroundImage: LocalFile
    backgroundImageDark: LocalFile
    video: LocalFile
    profile: LocalFile
    button: Button
    media: [CustomImage]
    items: [GridItems]
    dualSectionPart: [SectionPart]
    Card: [Card]
    ListItem: [Card]
    english_cases: [StrapiEnglishCase]
    eng_professionals: [StrapiEnglishProfessional]
    english_articles: [StrapiEnglishArticle]
  }

  type Card {
    id: ID!
    title: String
    description: String
    english_landing_page: StrapiEnglishLandingPage
    icon: LocalFile
  }

  type GridItems {
    id: ID!
    title: String!
    text: String
    english_landing_page: StrapiEnglishLandingPage
    image: LocalFile
  }

  type CustomImage {
    id: ID!
    name: String
    img: LocalFile
    imageDark: LocalFile
  }

  type SectionPart {
    id: ID!
    title: String
    description: String
    button: Button
    image: LocalFile
    backgroundImage: LocalFile
    backgroundImageDark: LocalFile
  }

  type Button {
    content: String!
    url: String
    english_landing_page: StrapiEnglishLandingPage
  }

  type LocalFile {
    localFile: File @link(from: "localFile___NODE")
  }
`
module.exports = {
  value: landingSchema,
}
