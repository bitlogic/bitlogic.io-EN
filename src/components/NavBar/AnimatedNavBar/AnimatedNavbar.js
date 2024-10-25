import React, { useState } from "react"
import Navbar from "./Navbar"
import NavbarItem from "./Navbar/NavbarItem"
import { Flipper } from "react-flip-toolkit"
import DropdownContainer from "./DropdownContainer"
import Dropdown from "./DropdownContainer/Dropdown"
import DropdownItem from "./DropdownContainer/DropdownItems"
import { useLandingUrl } from "../../../hooks"
import PropTypes from "prop-types"

const hasSubLandingPages = (navItem) => navItem?.dropdownItems?.some(
  item => item?.english_sub_landing_pages && item.english_sub_landing_pages.length > 0
)

function getDropdown(navItem){
  if(hasSubLandingPages(navItem)){
    return () => 
      <DropdownItem 
        sections={navItem?.dropdownItems.map(item => ({
          ...item,
          subItems: item?.english_sub_landing_pages,
        }))}
        topLevel={navItem?.toplevelItem}
      />

  }else{
    return () => (
      navItem?.dropdown ? (
        <Dropdown
          sections={navItem?.dropdownItems}
          topLevel={navItem?.toplevelItem}
        />
      ) : (
        <Dropdown sections={null} topLevel={null} />
      )
    );
  }
}

const AnimatedNavbar = ({ navbarItems = [], duration }) => {
  const getUrl = useLandingUrl()

  const url = (item) => {
    if (item.dropdown) return ''

    const landing = getUrl(item?.english_landing_page?.slug);

    if (landing) return landing

    let slug = item?.url ? item.url : ''

    return slug
  }


  const navbarConfig = [
    ...navbarItems.map(navItem => {
      let res = {
        title: navItem.title,
        slug: url(navItem),
        dropdown: getDropdown(navItem), 
        isDropdown: navItem?.dropdown,
        isDropdownItem: hasSubLandingPages(navItem),
      }

      return res
    }),
  ]

  const [activeIndex, setActiveIndex] = useState([])
  const [animationOut, setAnimationOut] = useState(null)

  const [animatingOutTimeout, setAnimatingOutTimeout] = useState(null)

  const resetDropdownState = i => {
    setActiveIndex(typeof i === "number" ? [i] : [])
    setAnimationOut(false)

    setAnimatingOutTimeout(null)
  }

  const onMouseEnter = i => {
    if (animatingOutTimeout) {
      clearTimeout(animatingOutTimeout)
      resetDropdownState(i)
      return
    }
    if (activeIndex[activeIndex.length - 1] === i) return

    setActiveIndex(prev => prev.concat(i))
    setAnimationOut(false)
  }

  const onMouseLeave = () => {
    setAnimationOut(true)
    setAnimatingOutTimeout(setTimeout(resetDropdownState, duration))
  }

  let CurrentDropdown
  let PrevDropdown
  let direction

  const currentIndex =
    activeIndex.length > 0 && activeIndex[activeIndex.length - 1]
  const prevIndex =
    activeIndex.length > 1 && activeIndex[activeIndex.length - 2]

  if (typeof currentIndex === "number" && activeIndex.length > 0)
    CurrentDropdown = navbarConfig[currentIndex].dropdown
  if (typeof prevIndex === "number" && activeIndex.length > 1) {
    PrevDropdown = navbarConfig[prevIndex].dropdown
    direction = currentIndex > prevIndex ? "right" : "left"
  }

  return (
    <Flipper
      flipKey={currentIndex}
      spring={duration === 300 ? "noWobble" : { stiffness: 10, damping: 10 }}
    >
      <Navbar onMouseLeave={onMouseLeave}>
        {navbarConfig.map((n, index) => {
          return (
            <NavbarItem
              to={n.slug}
              key={n?.title}
              title={n?.title}
              index={index}
              onMouseEnter={onMouseEnter}
              isDropdown={n.isDropdown}
              isDropdownItem={n.isDropdownItem}
            >
              {currentIndex === index ? (
                <DropdownContainer
                  direction={direction}
                  animatingOut={animationOut}
                  duration={duration}
                >
                  <CurrentDropdown />
                  {PrevDropdown && <PrevDropdown />}
                </DropdownContainer>
              ) : null}
            </NavbarItem>
          )
        })}
      </Navbar>
    </Flipper>
  )
}

AnimatedNavbar.propTypes = {
  duration: PropTypes.number.isRequired,
  navbarItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      dropdown: PropTypes.bool,
      toplevelItem: PropTypes.object,
      dropdownItems: PropTypes.array,
      english_landing_page: PropTypes.shape({
        slug: PropTypes.string,
      }),
    })
  )
}

export default AnimatedNavbar
