import React from "react";
import FaIcon from "../../FaIcon/FaIcon"
import "./location.scss";

export default function Location({ location }) {
  const locationItems = location?.iconText.map((item, index) => {
    return (
      <div className="icon-text d-flex" key={`${item.name}-${index}`}>
        {item.icon && <FaIcon type={item.icon.type} code={item.icon.code} />}
        {item.name}
      </div>
    )
  });
  return (
    <div className='ContactData__Item'>
      <h6>{location?.title}</h6>
      <div className='ContactData__Item__location'>{locationItems}</div>
    </div>
  )
}
