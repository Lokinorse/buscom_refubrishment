import React from "react";

import { IProductOption } from "../types";
import { reduceNumberFromString, beautifySum } from "../utils/helpers";

export const Checkbox = ({
  schemeMultiplier = 1,
  option,
  handleClick,
  checkedValue,
  disabled = false,
}: {
  schemeMultiplier?: number;
  option: IProductOption;
  handleClick: (...arg: any) => void;
  checkedValue: string;
  disabled?: boolean;
}) => {
  return (
    <div className="checkbox">
      {option.product_option_value.map((item) => {
        console.log("item", item);
        return (
          <div className="checkbox_label" key={item.option_value_id}>
            <label>
              <input
                disabled={disabled}
                type="radio"
                value={item.name}
                checked={checkedValue === item.name}
                onChange={() => {
                  handleClick(item);
                }}
              />
              {`${item.name} ${beautifySum(
                reduceNumberFromString(item.price) * schemeMultiplier
              )} ₽ ${
                item.name !== "Нет"
                  ? `(${schemeMultiplier} x ${beautifySum(
                      reduceNumberFromString(item.price)
                    )}    ₽)`
                  : ""
              }`}
            </label>
          </div>
        );
      })}
    </div>
  );
};
