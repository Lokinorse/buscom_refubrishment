import React, { useState } from "react";
import { ReactComponent as ArrowSvg } from "../assets/svg/scheme_choose_arrow.svg";

export const MenuItem = ({ onClick, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const arrowClass = isOpen ? "rotate_arrow" : "";
  return (
    <>
      <div className="menu_item" onClick={onClick || toggleOpen}>
        <div>{title}</div>
        <div className={`arrow ${arrowClass}`}>
          <ArrowSvg />
        </div>
      </div>
      {isOpen && children}
    </>
  );
};