import React, { memo } from "react"
import Navbar from "react-bootstrap/Navbar"
import AnimatedNavbar from "./AnimatedNavBar/AnimatedNavbar"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import CustomLink from "../CustomLink/CustomLink"
import { Link } from "gatsby"
import "./NavBar.scss"

import { useNavbar } from "../../hooks/index"
import { useTheme } from "../../context/themeContext"
// theme images
import moon from "../../images/moon-solid.svg"
import sun from "../../images/sun.svg"

const NavBar = memo(() => {
  const { theme, toggleTheme } = useTheme()
  const navbarData = useNavbar()

  const menuData = navbarData.allStrapiLayout?.nodes[0].Menu

  const logoLight = getImage(
    navbarData.allStrapiLayout?.nodes[0].navbar?.logo?.localFile
  )
  const logoDark = getImage(
    navbarData.allStrapiLayout?.nodes[0].navbar?.logoDark?.localFile
  )

  const navbarButton = navbarData.allStrapiLayout?.nodes[0].navbar?.navButton

  return (
    <Navbar variant="dark" expand="xl" className="NavBar">
      <Link to="/" className="NavBar__Logo">
        {logoLight && (
          <GatsbyImage
            loading="lazy"
            image={theme === "dark" && logoDark ? logoDark : logoLight}
            alt={logoLight?.alternativeText || "Bitlogic - Home"}
            className="logo"
            width={120}
            height={35}
          />
        )}
      </Link>
      <Navbar.Toggle
        className="NavBar__Toggler"
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav" className="NavBar__Collapse">
        {menuData && (
          <div className="NavBar_links">
            <AnimatedNavbar navbarItems={menuData} duration={300} />
          </div>
        )}
        <div className="NavBar_Side">
          {navbarButton && (
            <CustomLink
              content={navbarButton.content}
              landing={navbarButton?.landing_page}
              url={navbarButton?.url}
              className={"NavBar_Side-contact"}
            />
          )}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? (
              <img
                src={moon}
                className="theme-toggle-moon"
                alt="theme"
                width="20"
              />
            ) : (
              <img
                className="theme-toggle-sun"
                src={sun}
                alt="theme"
                width="25"
              />
            )}
          </button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
})

export default NavBar
