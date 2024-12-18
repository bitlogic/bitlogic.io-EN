import React from 'react'
import './BlogGrid.scss'
import Pagination from '../../Pagination/Pagination'
import PropTypes from 'prop-types'

const BlogGrid = ({ title, children }) => {
  return (
    <div className="grid__container">
      <h2>{title}</h2>
      {/* <div className="grid__content">{children}</div> */}
      <Pagination initialState={true} postPerPage="9" posts={children} />
    </div>
  )
}

BlogGrid.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
}

export default BlogGrid