import React from 'react'
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import FaIcon from '../../FaIcon/FaIcon';
import './socialLinks.scss';

export default function SocialLinks({ logo, socialMedia }) {
  const Logo = getImage(logo?.localFile?.childImageSharp?.gatsbyImageData);

  const socialMediaItems = socialMedia?.map((item) => {
    return (
      <a
        key={item.id}
        href={item.url}
        target="_blank"
        className={`btn-social m-2 btn-social-icon btn-${item.icon?.name}`}
        rel="noreferrer"
        aria-label={`External Link - ${item?.name}`}
      >
        <FaIcon type={item.icon?.type} code={item.icon?.code} />
      </a>

    );
  });

  return (
    <div className="SocialMedia d-flex mt-3 flex-column flex-md-row-reverse">
      <div className="SocialMedia__Links d-flex justify-content-center justify-content-md-start px-3 px-md-2 px-xxl-3 text-md-start col-12 col-md-5 col-lg-4 col-xl-3">
        {socialMediaItems}
      </div>
      {Logo && (
        <div className="SocialMedia__Logo text-center text-md-start mt-2 ps-md-3 col-12 col-md-7 col-lg-8 col-xl-9">
          <Link to="/">
            <GatsbyImage
              image={Logo}
              alt={logo?.alternativeText
                ? logo.alternativeText
                : 'Bitlogic - Home'}
            />
          </Link>
        </div>
      )}


    </div>
  )
}