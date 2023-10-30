import React from "react";
import { ReactComponent as PhoneSvg } from "../assets/svg/phone.svg";

export const ContactButton = ({ clickHandler }) => {
  return (
    <button className={"contact_btn"} onClick={clickHandler}>
      Сделать заказ
      <div className="phone_svg_wrapper">
        <PhoneSvg />
      </div>
    </button>
  );
};
