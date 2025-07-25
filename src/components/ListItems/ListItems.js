import React from "react"
import CustomImage from "../CustomImage/CustomImage"
import { Link } from "gatsby"
import useLandingUrl from "../../hooks/useLandingUrl"
import PropTypes from "prop-types"
import MarkdownView from "react-showdown"
import "./ListItems.scss"

const ListItems = ({ data }) => {
  const { title, ListItem } = data
  const getUrl = useLandingUrl()

  const items = ListItem?.map(item => {
    const content = (
      <>
        <h3 className="d-flex align-items-center">
          <CustomImage
            image={item?.icon}
            alt={item?.icon?.alternativeText || item.title}
            className={"d-block image"}
            width={30}
            height={30}
          />
          {item.title}
        </h3>
        {item?.description && (
          <MarkdownView
            markdown={item.description}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
      </>
    )

    return (
      <div className="ListItems__wrapper__item" key={item.id}>
        {item?.english_landing_page ? (
          <Link to={getUrl(item.english_landing_page.slug)}>{content}</Link>
        ) : (
          content
        )}
      </div>
    )
  })

  return (
    <div className="ListItems container" data-nosnippet>
      {title && <h2>{title}</h2>}
      {ListItem?.length > 0 && (
        <div className="ListItems__wrapper d-flex flex-column flex-md-row">
          {items}
        </div>
      )}
    </div>
  )
}

ListItems.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    ListItem: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        english_landing_page: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
        icon: PropTypes.shape({
          url: PropTypes.string.isRequired,
          alternativeText: PropTypes.string,
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              gatsbyImageData: PropTypes.object.isRequired,
            }),
          }),
        }),
      })
    ),
  }),
}

export default ListItems
