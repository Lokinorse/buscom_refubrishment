import React from "react";
import { ReactComponent as PhoneSvg } from "../assets/svg/phone.svg";

export const ContactButton = ({ clickHandler, title = "Сделать заказ" }) => {
  return (
    <button className={"refub_btn contact_btn"} onClick={clickHandler}>
      {title}
      <div className="phone_svg_wrapper">
        <PhoneSvg />
      </div>
    </button>
  );
};
