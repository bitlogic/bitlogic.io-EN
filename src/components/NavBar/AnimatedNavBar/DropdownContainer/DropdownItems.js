import React, { memo, useState, useEffect } from "react"
import "./DropdownItems.scss"
import CustomImage from "../../../CustomImage/CustomImage"
import CustomLink from "../../../CustomLink/CustomLink"
import PropTypes from "prop-types"
import { FaAngleDown } from "react-icons/fa"

const RenderSection = ({section, className, isOpen, toggleSubLandingPages, isMobileView}) => {
    const { icon, label, url, english_landing_page, english_sub_landing_pages = [] } = section || {};
    const hasSubLandingPages = english_sub_landing_pages.length > 0;

    return (
        <>
            <div 
                className={className}
            >
                <CustomImage 
                    image={icon}
                    alt={icon?.alternativeText || "NavLink Icon"}
                    className="navbarItemIcon"
                    width={28}
                    height={28}
                />
                <CustomLink 
                    content={label}
                    url={url}
                    landing={english_landing_page}
                    className="dropdownItem_link-inner"
                />
                {hasSubLandingPages && 
                    <FaAngleDown 
                        className={`dropdownItem_icon ${isOpen ? "open" : ""}`} 
                        onClick={() => toggleSubLandingPages(section.id)}
                    />
                }
            </div>
            {section?.text && <p className="navItemP">{section.text}</p>}

            {(hasSubLandingPages && (isOpen || !isMobileView)) && (
                <ul className={`subLandingPages ${section.english_sub_landing_pages.length > 5 ? 'two-column-list' : ''}`} >
                    {english_sub_landing_pages.map(subItem => (
                        <li key={subItem.id} className="subLandingPages-item">
                            <CustomLink 
                                content={subItem.name}
                                url={`/${subItem.slug}`}
                                className="dropdownItem_link-subLanding"
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

RenderSection.propTypes = {
    section: PropTypes.shape({
        icon: PropTypes.shape({
            alternativeText: PropTypes.string
        }),
        label: PropTypes.string.isRequired,
        url: PropTypes.string,
        text: PropTypes.string,
        english_landing_page: PropTypes.string,
        english_sub_landing_pages: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired
            })
        )
    }).isRequired,
    className: PropTypes.string
};

DropdownItems.propTypes = {
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        text: PropTypes.string,
        url: PropTypes.string,
        landing_page: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
        sub_landing_pages: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
          })
        ),
        icon: PropTypes.shape({
          url: PropTypes.string,
          alternativeText: PropTypes.string,
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              gatsbyImageData: PropTypes.object.isRequired,
            }),
          }),
        }),
      })
    ),
    topLevel: PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      text: PropTypes.string,
      url: PropTypes.string,
      landing_page: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      sub_landing_pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ),
      icon: PropTypes.shape({
        url: PropTypes.string,
        alternativeText: PropTypes.string,
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.object.isRequired,
          }),
        }),
      }),
    }),
  };

export default DropdownItems