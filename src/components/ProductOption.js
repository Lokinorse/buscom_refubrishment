import React, { useState } from "react";
import { reduceNumberFromString } from "../utils/helpers";
// values which was already preseted in scheme
const hardcodePresetedOptions = ["Откидная спинка", "Подлокотник"];
export const getOptionCount = (scheme, option) => {
  if (scheme.id !== 9) {
    if (option.name === "Откидная спинка") return scheme.foldingSeats;
    if (option.name === "Подлокотник") return scheme.armrests;
    return scheme.seats;
  }
  return 1;
};

export const ProductOption = ({ option, setOptionsToTotalData, scheme }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleCheckboxChange = (event, optionId, optionName) => {
    const valueString = event.target.value;
    const value = JSON.parse(valueString);
    console.log(value);
    setSelectedValue(value.product_option_value_id);
    setOptionsToTotalData(optionId, optionName, value);
  };

  const optionCount = getOptionCount(scheme, option);
  return (
    <div className="product_option">
      <h3>{option.name}</h3>
      <div className="product_option_select_options_wrapper">
        {option.product_option_value.map((optionValue) => {
          const priceAndCountPostfix =
            optionValue.name === "Нет" || optionCount > 1
              ? ""
              : "X" +
                optionCount +
                reduceNumberFromString(optionValue.price) +
                "₽";
          console.log("optionValue", optionValue);
          return (
            <div key={optionValue.product_option_value_id}>
              <label>
                <input
                  type="checkbox"
                  value={JSON.stringify(optionValue)}
                  checked={
                    selectedValue === optionValue.product_option_value_id
                  }
                  onChange={(event) =>
                    handleCheckboxChange(
                      event,
                      option.product_option_id,
                      option.name
                    )
                  }
                />
                {`${optionValue.name} ${priceAndCountPostfix}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
