import { Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { Flipper, Flipped } from "react-flip-toolkit"
import MarkdownView from "react-showdown"
import { useLandingUrl } from "../../hooks"
import { useTheme } from "../../context/themeContext"
import "./expandGrid.scss"
import PropTypes from "prop-types"

const ExpandGrid = ({ data }) => {
  const { theme } = useTheme()
  const {
    title,
    subtitle,
    items,
    callToAction,
    backgroundImage,
    backgroundImageDark,
  } = data

  return (
    <div
      className="expandGrid-background"
      style={{
        backgroundImage: `url(${
          theme === "dark" && backgroundImageDark
            ? backgroundImageDark?.url
            : backgroundImage?.url
        })`,
      }}
    >
      <div className="mx-auto sm:mx-3 pb-5 container">
        <section className="expandGrid">
          <div className="expandGrid-body">
            {title && <h2>{title}</h2>}
            {subtitle && <h6 className="px-md-3">{subtitle}</h6>}
            <AnimatedList
              items={items.slice(0, 4)}
              callToAction={callToAction}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

ExpandGrid.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    callToAction: PropTypes.string,
    items: PropTypes.array,
    backgroundImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    backgroundImageDark: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}

const createCardFlipId = index => `listItem-${index}`

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 40)

const shouldFlip = index => (prev, current) =>
  index === prev || index === current

const ListItem = ({ index, onClick, data }) => {
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      shouldInvert={shouldFlip(index)}
    >
      <button
        className="listItem"
        onClick={() => onClick(index)}
        aria-label="Flip Cad"
      >
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="listItemContent">
            <div className="listItem-more">
              <h5>{data.title}</h5>
            </div>
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-image"
              shouldFlip={shouldFlip(index)}
              delayUntil={createCardFlipId(index)}
            >
              <img
                src={data.image?.url}
                className="avatar"
                loading="lazy"
                alt={data?.image?.alternativeText || "Card Image"}
              />
            </Flipped>
          </div>
        </Flipped>
      </button>
    </Flipped>
  )
}

ListItem.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string,
      alternativeText: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

const ExpandedListItem = ({ index, data, isFirst, callToAction }) => {
  const getUrl = useLandingUrl()
  const scrollRef = useRef(null)
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      onStart={el => {
        if (!isFirst) scrollToRef(scrollRef)
        setTimeout(() => {
          el.classList.add("animated-in")
        }, 400)
      }}
    >
      <div ref={scrollRef} className="listItem-expanded">
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="listItemContent-expanded">
            <div className="listItem-more-expanded">
              <h5>{data.title}</h5>
            </div>
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-image"
              delayUntil={createCardFlipId(index)}
            >
              <img
                src={data.image?.url}
                className="avatar-expanded"
                loading="lazy"
                alt={data?.image?.alternativeText || "Card Image Expanded"}
              />
            </Flipped>
            <div className={"additional-content "}>
              <div style={isFirst ? { opacity: "1" } : {}}>
                <h4>{data.title}</h4>
                <div className="additional-content-markdown">
                  <MarkdownView
                    markdown={data.text}
                    dangerouslySetInnerHTML={{ __html: data.text }}
                  />
                </div>
                {data.english_landing_page && (
                  <Link to={getUrl(data?.english_landing_page.slug)}>
                    {callToAction}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

ExpandedListItem.propTypes = {
  index: PropTypes.number,
  isFirst: PropTypes.bool,
  callToAction: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    english_landing_page: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string,
    }),
  }),
}

const AnimatedList = ({ items, callToAction }) => {
  const [itemsArray, setItemsArray] = useState({ items, focused: null })
  const [isFirst, setIsFirst] = useState(true)
  useEffect(() => {
    setItemsArray(prev => ({ ...prev, focused: items[0].id }))
  }, [items])

  const onClick = index => {
    for (let i = 0; i < items.length; i++) {
      const item = itemsArray.items[i]
      if (item.id === index) {
        setIsFirst(false)
        setItemsArray(prevItems => ({
          items: [
            item,
            ...prevItems.items.slice(0, i),
            ...prevItems.items.slice(i + 1),
          ],
          focused: item.id,
        }))
        break
      }
    }
  }
  return (
    <Flipper
      flipKey={itemsArray.focused}
      className="staggered-list-content"
      spring="noWobble"
      staggerConfig={{
        card: {
          reverse: itemsArray.focused !== null,
        },
      }}
      decisionData={itemsArray.focused}
    >
      <ul className="list">
        {itemsArray.items.map(item => {
          return (
            <>
              {item.id === itemsArray.focused ? (
                <ExpandedListItem
                  isFirst={isFirst}
                  index={itemsArray.focused}
                  data={item}
                  scrollToRef={scrollToRef}
                  callToAction={callToAction}
                />
              ) : (
                <ListItem
                  index={item.id}
                  key={item.id}
                  onClick={onClick}
                  data={item}
                />
              )}
            </>
          )
        })}
      </ul>
    </Flipper>
  )
}

AnimatedList.propTypes = {
  callToAction: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
}

export default ExpandGrid
