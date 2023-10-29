import React, { useState, useContext } from "react";
import { reduceNumberFromString } from "../utils/helpers";
import { TotalDataContext } from "./Refubrishment";
import { getNumberPriceFromProductPrice } from "../utils/helpers";

const getTotalPrice = (totalData2) => {
  let total = 0;
  for (const product of totalData2.products) {
    const productPrice = getNumberPriceFromProductPrice(product.price);
    const productCount = product.count || 1;
    total += productPrice * productCount;
    if (product.additional_options) {
      for (const option of product.additional_options) {
        total +=
          option.chosenOptionValue.count * option.chosenOptionValue.price;
      }
    }
  }
  return total;
};

export const TotalWidget = ({ totalData, resetSchemeHandler, urlConfig }) => {
  const { totalData2, dispatch, scheme } = useContext(TotalDataContext);
  const choosenSchemeText =
    scheme.id !== 9 ? `Выбранная схема: ${scheme.title}` : "";
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="total_wrapper">
      Расчёт:
      <div className="sum_text">{getTotalPrice(totalData2)} ₽</div>
    </div>
  );
};
