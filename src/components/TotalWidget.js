import React from "react";

const reduceNumberFromString = (str) => {
  const numberString = str.replace(/\s/g, "");
  const number = parseInt(numberString);
  return number;
};
export const TotalWidget = ({ totalData }) => {
  return (
    <div className="total">
      <h3>Расчёт: </h3>
      <div className="total_body">
        {Object.values(totalData).map((item) => {
          const itemPrice = item.selected_option.count
            ? item.selected_option.count *
              reduceNumberFromString(item.selected_option.price)
            : item.selected_option.price;
          return (
            <>
              <h4 className="step_title_h4">{item.cat_name}</h4>
              <div className="step_option">
                <div className="selected_option_name">
                  {item.selected_option.name}
                </div>
                <div className="selected_option_price">{itemPrice}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
