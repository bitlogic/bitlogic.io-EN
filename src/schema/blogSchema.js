const blogSchema = `
  type StrapiEnglishBlogCategory implements Node {
    parent: Node
    children: [Node!]!
    internal: Internal!
    id: ID!
    strapiId: Int
    name: String!
    article: [StrapiEnglishArticle]
    published_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    created_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    updated_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
  }
  
  type StrapiEnglishArticle implements Node {
    parent: Node
    children: [Node!]!
    internal: Internal!
    id: ID!
    strapiId: Int
    title: String!
    description: String!
    summary: String!
    slug: String!
    image: LocalFile
    imagePage: LocalFile
    seo: ComponentSeo
    blog_category: StrapiEnglishBlogCategory
    author: [StrapiEnglishArticleAuthor]
    published_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    created_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    updated_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
  }
  
  type StrapiEnglishArticleAuthor {
    id: Int!
    name: String!
    summary: String
    subTitle: String
    image: LocalFile
  }
  
  type StrapiEnglishBlogPage implements Node {
    parent: Node
    children: [Node!]!
    internal: Internal!
    id: ID!
    pageMetadata: ComponentSeo
    callToAction: String
    banner: ComponentBanner
    published_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    created_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    updated_at(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
  }
`

module.exports = {
  value: blogSchema,
}
