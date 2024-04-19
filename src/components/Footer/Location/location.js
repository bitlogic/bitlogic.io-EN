import React from "react";
import { useFooter } from '../../../hooks';
import FaIcon from "../../FaIcon/FaIcon"
import "./location.scss";

export default function Location() {
  const data = useFooter();
  const dataFooter = data?.allStrapiLayout?.nodes[0].footer;

  const location = dataFooter.location?.iconText.map((item, index) => {
    return (
      <div className="icon-text d-flex" key={`${item.name}-${index}`}>
        {item.icon && <FaIcon type={item.icon.type} code={item.icon.code} />}
        {item.name}
      </div>
    )
  });
  return (
    <div className='ContactData__Item'>
      <h6>{dataFooter?.location?.title}</h6>
      <div className='ContactData__Item__location'>{location}</div>
    </div>
  )
}
