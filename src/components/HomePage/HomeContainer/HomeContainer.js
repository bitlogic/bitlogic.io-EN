import * as React from "react"
import { useHomePage } from "../../../hooks/index"
import Layout from "../../layout"
import { Seo, CustomSection } from "../../index"
import "./HomeContainer.scss"

const Home = ({ location }) => {
  const data = useHomePage()

  const { pageTitle, pageDescription, pageKeywords } =
    data?.allStrapiHome?.nodes[0]?.pageMetadata || {}

  return (
    <Layout location={location}>
      {data?.allStrapiHome?.nodes[0]?.pageMetadata && (
        <Seo
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords}
        />
      )}
      {/* Dynamic zone */}
      <CustomSection
        sections={data.allStrapiHome.nodes[0].body}
      />
    </Layout>
  )
}

export default Home
