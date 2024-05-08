import React from "react"
import { useBlog } from "../../hooks"
import "./featuredBlogs.scss"
import BlogArticle from "../BlogPage/BlogArticle/BlogArticle"

const compareDates = (a, b) => {
  if (a?.published_at < b?.published_at) {
    return 1
  } else if (a?.published_at > b?.published_at) {
    return -1
  } else {
    return 0
  }
}

const FeaturedBlogs = ({ data }) => {
  const blogData = useBlog()
  const {callToAction} = blogData.allStrapiBlogPage.nodes[0]

  return (
    <div
      className="container featured pb-3"
      id={data.strapi_component + "-" + data.id}
    >
      <h2>{data.title}</h2>
      <h6 className="px-md-3">{data.subtitle}</h6>

      <div className="featured-blogs">
        {data.english_articles
          .sort(compareDates)
          .slice(0, 3)
          .map((item, idx) => (
            <BlogArticle
              key={idx}
              image={item.image}
              title={item.title}
              summary={item.summary}
              slug={"/blog/" + item.slug}
              text={callToAction}
            />
          ))}
      </div>
    </div>
  )
}

export default FeaturedBlogs
