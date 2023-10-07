import React from "react";

import { IProductOption } from "../types";

export const Checkbox = ({
  option,
  handleClick,
  checkedValue,
  disabled = false,
}: {
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
                value={JSON.stringify(item.name)}
                checked={checkedValue === item.name}
                onChange={(event) => {
                  handleClick(event, item);
                }}
              />
              {`${item.name}`}
            </label>
          </div>
        );
      })}
    </div>
  );
};
