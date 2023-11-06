import React from "react";
import { beautifySum } from "../utils/helpers";

export const TotalWidget = ({ totalPrice }) => {
  return (
    <div className="total_wrapper">
      <div className="sum_text">
        Сумма:
        <span style={{ fontWeight: "bold" }}> {beautifySum(totalPrice)} ₽</span>
      </div>
    </div>
  );
};
