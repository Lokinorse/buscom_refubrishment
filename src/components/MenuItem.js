import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowSvg } from "../assets/svg/scheme_choose_arrow.svg";

export const MenuItem = ({
  onClick,
  title,
  forceOpen = false,
  children,
  rightTitle = "",
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  useEffect(() => {
    setIsOpen(forceOpen);
  }, [forceOpen]);
  const toggleOpen = () => setIsOpen(!isOpen);
  const arrowClass = isOpen ? "rotate_arrow" : "";
  return (
    <div className="menu_item">
      <div className="header" onClick={onClick || toggleOpen}>
        <div>{title}</div>

        <div className="menu_item_right_part">
          {rightTitle}
          <div className={`arrow ${arrowClass}`}>
            <ArrowSvg />
          </div>
        </div>
      </div>
      {isOpen && <div className="menu_item_child_wrapper">{children}</div>}
    </div>
  );
};
