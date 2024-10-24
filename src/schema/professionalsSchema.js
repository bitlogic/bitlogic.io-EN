const blogSchema = `
type StrapiEnglishProfessional implements Node {
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
    name: String
    position: String
    quote: String
    linkedin: String
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
    photo: LocalFile
    strapiId: ID
  }

  type LocalFile {
    localFile: File @link(from: "localFile___NODE")
  }
  
`

module.exports = {
  value: blogSchema,
}
