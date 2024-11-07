import React, { memo, useState, useEffect } from "react"
import "./DropdownItems.scss"
import CustomImage from "../../../CustomImage/CustomImage"
import CustomLink from "../../../CustomLink/CustomLink"
import PropTypes from "prop-types"
import { FaAngleDown } from "react-icons/fa"

const RenderSection = ({section, className }) => {
    const { icon, label, url, english_landing_page, english_sub_landing_pages = [] } = section || {};
    const hasSubLandingPages = english_sub_landing_pages.length > 0;
    const [openSubLandingPages, setOpenSubLandingPages] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1200);
        };
        window.addEventListener("resize", handleResize);
    }, []);

    const toggleSubLandingPages = () => {
        if (isMobileView) setOpenSubLandingPages(prev => !prev);
    };

    return (
        <>
            <div 
                className={className}
                onClick={toggleSubLandingPages}
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
                {hasSubLandingPages && <FaAngleDown className={`dropdownItem_icon ${openSubLandingPages ? "open" : ""}`} />}
            </div>
            {(hasSubLandingPages && (openSubLandingPages || !isMobileView)) && (
                <ul 
                    className={`subLandingPages ${
                        section.english_sub_landing_pages.length > 5 ? 'two-column-list' : ''
                    }`} 
                >
                    {section.english_sub_landing_pages.map(subItem => (
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

const DropdownItems = memo(({ sections, topLevel }) => {
    return (
        <div className="dropdownItem_container" style={!sections ? { maxHeight: "0" } : {}}>
            <div className="dropdownItem_section" data-first-dropdown-section>
                {topLevel && (
                    <div
                        className="dropdownItem_topLevel"
                        style={{
                            marginRight: "15px",
                            paddingBottom: "8px",
                        }}
                    >
                        <RenderSection
                            section={topLevel}
                            className={"dropdownItem_link-topLevel"}
                        />
                    </div>    
                )}
                <div className="dropdownItem_content">
                    {sections?.map(section => (
                        <div key={section.id} className="dropdownItem">
                            <RenderSection
                                section={section}
                                className={"dropdownItem_link"}
                            />
                        </div>   
                    ))}
                </div>
            </div>
        </div>
    )
})

DropdownItems.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ),
    topLevel: PropTypes.object,
};


export default DropdownItems