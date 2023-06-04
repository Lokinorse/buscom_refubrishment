import React from "react";

const reduceNumberFromString = (str) => {
  if (typeof str === "number") return str;
  const numberString = str.replace(/\s/g, "");
  const number = parseInt(numberString);
  return number;
};

const getItemPriceString = (item) => {
  const rawPrice = item.selected_option.price;
  if (item.selected_option.count) {
    return item.selected_option.count * reduceNumberFromString(rawPrice) + " ₽";
  }
  if (typeof rawPrice === "string") {
    return rawPrice.replace("руб.", "₽");
  } else {
    return rawPrice + " ₽";
  }
};

export const TotalWidget = ({ totalData }) => {
  console.log("totalData", totalData);
  return (
    <div className="total_wrapper">
      <div className="total">
        <h3>РАСЧЁТ: </h3>
        <div className="total_body">
          {Object.values(totalData).map((item) => {
            const itemPrice = getItemPriceString(item);
            return (
              <div className="ordered_item" key={item.cat_name}>
                <div className="ordered_item_title">{item.cat_name}</div>
                <div className="step_option">
                  <div className="selected_option_name">
                    {item.selected_option.name}
                  </div>
                  <div className="selected_option_price">{itemPrice}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
