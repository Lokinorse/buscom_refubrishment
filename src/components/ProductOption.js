import React, { useState } from "react";
import { reduceNumberFromString } from "../utils/helpers";
// values which was already preseted in scheme
const presetOptionsIds = { 62: "armrests", 125: "foldingSeats" };

const getProductOptionSchemeBasedQuantity = (scheme, optionValue) => {
  if (scheme.id == 9) return 1;
  const schemeMultiplier = scheme.seats;
  // preset count to options from scheme if exists
  if (
    scheme.id != 9 &&
    Object.keys(presetOptionsIds)
      .map((item) => item + "")
      .includes(optionValue?.option_value_id)
  ) {
    return scheme[presetOptionsIds[optionValue?.option_value_id]];
  } else {
    return schemeMultiplier;
  }
};

export const ProductOption = ({ option, setOptionsToTotalData, scheme }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleCheckboxChange = (event, optionId, optionName) => {
    const valueString = event.target.value;
    const value = JSON.parse(valueString);
    setSelectedValue(value);
    setOptionsToTotalData(optionId, optionName, value);
  };

  return (
    <div className="product_option">
      <h3>{option.name}</h3>
      <div className="product_option_select_options_wrapper">
        {option.product_option_value.map((optionValue) => {
          optionValue.quantity = getProductOptionSchemeBasedQuantity(
            scheme,
            optionValue
          );

          const optionQuantityAndPricePostfix =
            optionValue.name !== "Нет"
              ? ` X ${optionValue.quantity} (${reduceNumberFromString(
                  optionValue.price
                )} ₽)`
              : "";
          return (
            <div key={optionValue.product_option_value_id}>
              <label>
                <input
                  type="checkbox"
                  value={JSON.stringify(optionValue)}
                  checked={
                    selectedValue.product_option_value_id ===
                    optionValue.product_option_value_id
                  }
                  onChange={(event) =>
                    handleCheckboxChange(
                      event,
                      option.product_option_id,
                      option.name
                    )
                  }
                />
                {`${optionValue.name} ${optionQuantityAndPricePostfix}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
