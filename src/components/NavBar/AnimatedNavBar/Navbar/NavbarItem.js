import { Link } from "gatsby"
import React from "react"
import "./navbarItems.scss"

const NavbarItem = ({ title, children, index, to, ...props }) => {
  const onMouseEnter = () => {
    props.onMouseEnter(index)
  }
  return (
    <li className="navbar_item">
      <Link
        activeClassName="navbar_item-title-active"
        to={to}
        className="navbar_item-title"
        onMouseEnter={onMouseEnter}
        onFocus={onMouseEnter}
      >
        {title}
      </Link>
      <div className="navbar_item-dropdown_container">{children}</div>
    </li>
  )
}
export default NavbarItem
