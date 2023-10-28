import React from "react";

import { IProductOption } from "../types";
import { reduceNumberFromString } from "../utils/helpers";

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
        return (
          <div className="checkbox_label">
            <label>
              <input
                disabled={disabled}
                type="checkbox"
                value={item.name}
                checked={checkedValue === item.name}
                onChange={() => {
                  handleClick(item);
                }}
              />
              {`${item.name} ${
                reduceNumberFromString(item.price) * schemeMultiplier
              }₽ ${
                item.name !== "Нет"
                  ? `(${schemeMultiplier}x${reduceNumberFromString(
                      item.price
                    )} ₽)`
                  : ""
              }`}
            </label>
          </div>
        );
      })}
    </div>
  );
};
