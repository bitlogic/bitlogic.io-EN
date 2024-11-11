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

const DropdownItems = memo(({ sections, topLevel }) => {

    const [openSectionId, setOpenSectionId] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1200);

    // Actualizar el estado `isMobileView` según el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
        setIsMobileView(window.innerWidth < 1200);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSubLandingPages = (sectionId) => {
        if (isMobileView) {
          setOpenSectionId((prevId) => (prevId === sectionId ? null : sectionId));
        }
    };
    
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
                            isOpen={openSectionId === topLevel.id}
                            toggleSubLandingPages={toggleSubLandingPages}
                            isMobileView={isMobileView}
                        />
                    </div>    
                )}
                <div className="dropdownItem_content">
                    {sections?.map(section => (
                        <div key={section.id} className="dropdownItem">
                            <RenderSection
                                section={section}
                                className={"dropdownItem_link"}
                                isOpen={openSectionId === section.id}
                                toggleSubLandingPages={toggleSubLandingPages}
                                isMobileView={isMobileView}
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