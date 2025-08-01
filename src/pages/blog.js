import React from "react"
import BlogPage from "../components/BlogPage/BlogContainer"
import PropTypes from "prop-types"

const Blog = ( {location}) => <BlogPage location={location} />

Blog.propTypes = {
    location: PropTypes.object.isRequired
}

export default Blog
